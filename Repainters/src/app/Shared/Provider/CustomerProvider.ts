import { Injectable } from "@angular/core";
import { Customer } from "../models/customer";
import { CustomerService } from "../Service/Customer/customer.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable,tap,catchError,throwError, of } from "rxjs";
import Swal from 'sweetalert2';
@Injectable({
    providedIn:'root'
})
export class CustomerProvider{
    private _customer=new BehaviorSubject<Customer[]>([]);
    private _currentCustomer = new BehaviorSubject<Customer | null>(null);
    customerList:{customer:Customer[]}={customer:[]};
    getPaginatedData:any;
    get customer(){
        return this._customer.asObservable();
    }
    private _customers=new BehaviorSubject<Customer>(new Customer);
    currentCustomer:{_customers:Customer}={_customers:new Customer()};
    get customers$() {
        return this._customers.asObservable();
    }
    get currentCustomer$() {
        return this._currentCustomer.asObservable();
    }
    constructor(private CustomerService:CustomerService,private toaster:ToastrService){}
    addCustomer(customer:Customer){
        this.CustomerService.addCustomer(customer).subscribe((data)=>{
            customer.id=data["created_id"];
            this.customerList.customer.push(customer)
            this._customer.next(Object.assign({},this.customerList).customer)
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Customer saved successfully',
                confirmButtonText: 'OK'
            });
        });
    }
    listCustomer() {
        this.CustomerService.listCustomer().subscribe((data) => {
          this.customerList.customer = data as Customer[];
          this._customer.next(Object.assign({}, this.customerList).customer);
          this._pendingCustomerFetches.forEach(id => this.getCustomerById(id));
          this._pendingCustomerFetches.clear();
        });
      }
      private _pendingCustomerFetches = new Set<number>();
    updateCustomer(customer:Customer) {
        this.CustomerService.updateCustomer(customer).subscribe((data) => {
            let index = this.customerList.customer.findIndex((n) => n.id == customer.id);
            this.customerList.customer[index] = customer;
            this._customer.next(Object.assign({}, this.customerList).customer );
            this.toaster.success(data.message, "Success");
        });
    }
    deleteCustomer(customer: Customer) :void{
        this.CustomerService.deleteCustomer(customer.id).subscribe(
            (deleteCustomer)=>{this.listCustomer();},
            (error)=>{
                this.toaster.error("Failed to delete customer","Error");
            }
        )
    }
    getCustomerById(id: number): Observable<Customer> {
        const existingCustomer = this.getCustomerByIdFromState(id);
        if (existingCustomer) {
          return of(existingCustomer);
        }
        if (this.customerList.customer.length === 0) {
          this._pendingCustomerFetches.add(id);
          this.listCustomer();
        }
        return this.CustomerService.getCustomerById(id).pipe(
          tap(customer => {
            console.log('Customer fetched:', customer);
            if (!this.getCustomerByIdFromState(id)) {
              this.customerList.customer.push(customer);
              this._customer.next(Object.assign({}, this.customerList).customer);
            }
          }),
          catchError(error => {
            console.error('Full error details:', error);
            this.toaster.error(`Failed to fetch customer (ID: ${id})`, "Error");
            return throwError(error);
          })
        );
      }
    getCustomerByIdFromState(id: number): Customer | undefined {
        return this.customerList.customer.find(customer => customer.id === id);
    }
}