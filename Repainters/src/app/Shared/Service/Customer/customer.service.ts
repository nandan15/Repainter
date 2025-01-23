import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { Customer } from "../../models/customer";
import { ResponseObj } from "../../models/login";
@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    baseUrl: string = environment.backend.baseURL;
    private customerMethod = this.baseUrl + "v1/enquiry";
    constructor(private httpClient: HttpClient) {}
    public getCustomerById(id: number): Observable<Customer> {
        return this.httpClient.get<Customer>(`${this.customerMethod}/${id}`);
    }
    public addCustomer(customer: Customer): Observable<ResponseObj> {
        return this.httpClient.post<ResponseObj>(this.customerMethod + "/create", customer);
    }
    public listCustomer(query: string = ""): Observable<any> {
        return this.httpClient.get<any>(this.customerMethod + query);
    }
    public updateCustomer(customer: Customer): Observable<ResponseObj> {
        return this.httpClient.post<ResponseObj>(`${this.customerMethod}/update/${customer.id}`, customer);
    }
    public deleteCustomer(id: number): Observable<ResponseObj> {
        return this.httpClient.delete<ResponseObj>(`${this.customerMethod}/${id}`);
    }
}