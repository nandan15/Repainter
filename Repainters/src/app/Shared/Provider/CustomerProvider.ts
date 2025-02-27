import { Injectable } from "@angular/core";
import { Customer } from "../models/customer";
import { CustomerService, ImageUploadResponse } from "../Service/Customer/customer.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, tap, catchError, throwError, of, map, finalize, forkJoin, switchMap } from "rxjs";
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class CustomerProvider {
  private _customer = new BehaviorSubject<Customer[]>([]);
  private _currentCustomer = new BehaviorSubject<Customer | null>(null);
  private customerList: { customer: Customer[] } = { customer: [] };
  private _customerCache = new Map<number, Customer>();

  constructor(
      private customerService: CustomerService,
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

  public addCustomer(customer: Customer, floorPlanFiles: File[], sitePlanFiles: File[]): Observable<{ success: boolean; customerId?: number }> {
    const formData = new FormData();
    formData.append('customerData', JSON.stringify(customer));
    if (floorPlanFiles && floorPlanFiles.length > 0) {
        floorPlanFiles.forEach(file => {
            formData.append('floorPlanImages', file, file.name);
        });
    }
    if (sitePlanFiles && sitePlanFiles.length > 0) {
        sitePlanFiles.forEach(file => {
            formData.append('sitePlanImages', file, file.name);
        });
    }
    return this.customerService.addCustomer(formData).pipe(
        map(response => {
            if (response.customerId) {  
                return {
                    success: true,
                    customerId: response.customerId 
                };
            } else {
                throw new Error(response?.message || 'Failed to add customer');
            }
        }),
        catchError(error => {
            console.error('Error in customer provider:', error);
            this.toaster.error(error.message || 'Failed to add customer', 'Error');
            return throwError(() => error);
        })
    );    
}
  listCustomer(): Observable<any> {
    return this.customerService.listCustomer().pipe(
        tap(data => {
            if (Array.isArray(data)) {
                this.customerList.customer = data;
                this._customer.next([...this.customerList.customer]);
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

  public updateCustomer(customer: Customer): Observable<{ success: boolean; message?: string }> {
    return this.customerService.updateCustomer(customer).pipe(
        tap(() => {
            const index = this.customerList.customer.findIndex(c => c.id === customer.id);
            if (index >= 0) {
                this.customerList.customer[index] = customer;
                this._customer.next([...this.customerList.customer]);
                this._customerCache.set(customer.id, customer);
            }
            this.toaster.success('Customer updated successfully', 'Success');
        }),
        catchError(error => {
            this.toaster.error('Failed to update customer', 'Error');
            return throwError(() => error);
        })
    );
  }

  private cacheCustomer(customer: Customer) {
    if (customer && customer.id) {
        this._customerCache.set(customer.id, customer);
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
    const cachedCustomer = this._customerCache.get(id);
    if (cachedCustomer) {
        this._currentCustomer.next(cachedCustomer);
        return of(cachedCustomer);
    }

    return this.customerService.getCustomerById(id).pipe(
        tap(customer => {
            this._customerCache.set(id, customer);
            this._currentCustomer.next(customer);
        }),
        catchError(error => {
            console.error('Error fetching customer:', error);
            return throwError(() => error);
        })
    );
  }

  getCustomerByIdFromState(id: number): Customer | undefined {
    const cachedCustomer = this._customerCache.get(id);
    if (cachedCustomer) {
        return cachedCustomer;
    }
    return this.customerList.customer.find(customer => customer.id === id);
  }

  getNextCustomerId(): Observable<string> {
    return this.customerService.getNextEnquiryId().pipe(
      map(response => {
        // The response now has an 'enquiryId' property instead of 'lastId'
        return response.enquiryId;
      }),
      catchError(error => {
        console.error('Error fetching enquiry ID:', error);
        return of('ES6001'); // Fallback ID
      })
    );
  }
  
  deleteCustomer(customer: Customer): Observable<any> {
    return this.customerService.deleteCustomer(customer.id).pipe(
        tap(() => {
            this.customerList.customer = this.customerList.customer.filter(c => c.id !== customer.id);
            this._customer.next([...this.customerList.customer]);
            this._customerCache.delete(customer.id);
            this.toaster.success("Customer Deleted Successfully", "Success");
        }),
        catchError(error => {
            console.error('Error deleting customer:', error);
            this.toaster.error("Failed to delete Customer", "Error");
            return throwError(() => error);
        })
    );
  } 
public uploadMultipleImages(customerId: number, files: File[], type: 'floor' | 'site'): Observable<ImageUploadResponse[]> {
    return this.customerService.uploadMultipleImages(customerId, files, type);
}
loadCustomerImages(customerId: number): Observable<{floorPlan: string[], sitePlan: string[]}> {
    return this.customerService.getImagesById(customerId).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        } else {
          throw new Error(response.message || 'Failed to fetch customer images');
        }
      }),
      catchError(error => {
        console.error('Error fetching the images:', error);
        return throwError(() => new Error('Failed to load customer images'));
      })
    );
  }
}