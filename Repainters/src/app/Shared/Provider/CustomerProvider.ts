import { Injectable } from "@angular/core";
import { Customer } from "../models/customer";
import { CustomerService, ImageUploadResponse } from "../Service/Customer/customer.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable,tap,catchError,throwError, of, map, finalize, forkJoin } from "rxjs";
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from "@angular/router";
@Injectable({
    providedIn:'root'
})
export class CustomerProvider{
  private _customer = new BehaviorSubject<Customer[]>([]);
  private _currentCustomer = new BehaviorSubject<Customer | null>(null);
  private customerList: { customer: Customer[] } = { customer: [] };
  private _pendingCustomerFetches = new Set<number>();
  private _customerCache = new Map<number, Customer>();

  constructor(
    private CustomerService: CustomerService,
    private toaster: ToastrService,
    private router: Router
) {
    this.listCustomer().subscribe();
}

get customer() {
    return this._customer.asObservable();
}

get currentCustomer$() {
    return this._currentCustomer.asObservable();
}
addCustomer(customer: Customer): Observable<{ success: boolean; customerId?: number }> {
    return this.CustomerService.addCustomer(customer).pipe(
      map(response => {
        if (response && response.id) {
          customer.id = response.id;
          this.customerList.customer.push(customer);
          this._customer.next([...this.customerList.customer]);
          this._customerCache.set(response.id, customer);
  
          return {
            success: true,
            customerId: response.id
          };
        } else {
          console.error('Response:', response);
          throw new Error('No customer ID received from server');
        }
      }),
      catchError(error => {
        console.error('Error in customer provider:', error);
        return throwError(() => error);
      })
    );
  }
    listCustomer(): Observable<any> {
      return this.CustomerService.listCustomer().pipe(
          tap(data => {
              if (Array.isArray(data)) {
                  this.customerList.customer = data;
                  this._customer.next([...this.customerList.customer]);
                  
                  // Cache all customers
                  this.customerList.customer.forEach(customer => {
                      if (customer && customer.id) {
                          this._customerCache.set(customer.id, customer);
                      }
                  });
              }
          }),
          catchError(error => {
              console.error('Failed to fetch customer list:', error);
              this.toaster.error('Failed to fetch customer list', 'Error');
              return throwError(() => error);
          })
      );
  }
    updateCustomer(customer:Customer) {
        this.CustomerService.updateCustomer(customer).subscribe((data) => {
            let index = this.customerList.customer.findIndex((n) => n.id == customer.id);
            this.customerList.customer[index] = customer;
            this._customer.next(Object.assign({}, this.customerList).customer );
            this.toaster.success(data.message, "Success");
        });
    }
    private cacheCustomer(customer: Customer) {
      if (customer && customer.id) {
          this._customerCache.set(customer.id, customer);
          
          // Also update the customer list if it exists
          const index = this.customerList.customer.findIndex(c => c.id === customer.id);
          if (index >= 0) {
              this.customerList.customer[index] = customer;
          } else {
              this.customerList.customer.push(customer);
          }
          
          this._customer.next([...this.customerList.customer]);
      }
  }
  getCustomerById(id: number): Observable<Customer> {
    // First check the cache
    const cachedCustomer = this._customerCache.get(id);
    if (cachedCustomer) {
        this._currentCustomer.next(cachedCustomer);
        return of(cachedCustomer);
    }

    // If not in cache, make the API call
    return this.CustomerService.getCustomerById(id).pipe(
        tap(customer => {
            if (customer) {
                // Cache the customer
                this._customerCache.set(id, customer);
                this._currentCustomer.next(customer);
                
                // Update customer list if exists
                const index = this.customerList.customer.findIndex(c => c.id === id);
                if (index >= 0) {
                    this.customerList.customer[index] = customer;
                } else {
                    this.customerList.customer.push(customer);
                }
                this._customer.next([...this.customerList.customer]);
            }
        }),
        catchError(error => {
            console.error('Error fetching customer:', error);
            // Load full customer list as fallback
            return this.listCustomer().pipe(
                map(() => {
                    const foundCustomer = this._customerCache.get(id);
                    if (foundCustomer) {
                        return foundCustomer;
                    }
                    throw new Error('Customer not found');
                }),
                catchError(listError => {
                    this.toaster.error('Failed to load customer data', 'Error');
                    return throwError(() => listError);
                })
            );
        })
    );
}

getCustomerByIdFromState(id: number): Customer | undefined {
    // First check cache
    const cachedCustomer = this._customerCache.get(id);
    if (cachedCustomer) {
        return cachedCustomer;
    }
    
    // Then check customer list
    return this.customerList.customer.find(customer => customer.id === id);
}
    getNextCustomerId(): Observable<string> {
      return this.CustomerService.getLatestCustomerId().pipe(
        map(response => {
          // Return the ID exactly as received from the backend
          return response.lastId;
        }),
        catchError(error => {
          console.error('Error fetching customer ID:', error);
          return of('ES6001'); // Fallback ID
        })
      );
    }
  
    uploadMultipleImages(customerId: number, files: File[], type: 'floor' | 'site'): Observable<any> {
      return forkJoin(
        files.map((file: File) => {
          return this.CustomerService.uploadImage(customerId, file, type).pipe(
            catchError((error) => {
              console.error('Error uploading image:', error);
              this.toaster.error('Failed to upload one or more images', 'Error');
              return throwError(() => error);
            })
          );
        })
      );
    }
  deleteCustomer(customer: Customer): Observable<any> {
                   return new Observable(observer => {
                       this.CustomerService.deleteCustomer(customer.id).subscribe(
                           (response) => {
                               this.customerList.customer = this.customerList.customer.filter(item => item.id ! == customer.id);
                               this._customer.next([...this.customerList.customer]);
                               
                               this.toaster.success("Customer Deleted Successfully", "Success");
                               observer.next(response);
                               observer.complete();
                           },
                           (error) => {
                               this.toaster.error("Failed to delete Customer", "Error");
                               observer.error(error);
                           }
                       );
                   });
               }
  }