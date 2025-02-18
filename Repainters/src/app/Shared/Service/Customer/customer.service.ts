import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, forkJoin, Observable, throwError } from "rxjs";
import { environment } from "src/environment/environment";
import { Customer, CustomerImagesModel } from "../../models/customer";

export interface ResponseObj {
    success: boolean;
    message: string;
    data?: any;
    status?: boolean;
}

export interface ImageUploadResponse extends ResponseObj {
    imageUrl?: string;
}

export interface CustomerResponse extends Customer {
    success?: boolean;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    baseUrl: string = environment.backend.baseURL;
    private customerMethod = this.baseUrl + "v1/enquiry";

    constructor(private httpClient: HttpClient) {}

    public getCustomerById(id: number): Observable<Customer> {
        return this.httpClient.get<Customer>(`${this.customerMethod}/get/${id}`).pipe(
            catchError(error => {
                console.error('Error fetching customer:', error);
                return throwError(() => new Error('Failed to fetch customer data'));
            })
        );
    }

    public getCustomerImages(customerId: number): Observable<CustomerImagesModel> {
        return this.httpClient.get<CustomerImagesModel>(`${this.customerMethod}/customer-images/${customerId}`).pipe(
            catchError(error => {
                console.error('Error fetching customer images:', error);
                return throwError(() => new Error('Failed to fetch customer images'));
            })
        );
    }

    public addCustomer(customer: Customer): Observable<CustomerResponse> {
        return this.httpClient.post<CustomerResponse>(this.customerMethod + "/create", customer).pipe(
            catchError(error => {
                console.error('Error adding customer:', error);
                return throwError(() => error);
            })
        );
    }

    public listCustomer(query: string = ""): Observable<any> {
        return this.httpClient.get<any>(this.customerMethod + query);
    }

    public updateCustomer(customer: Customer): Observable<ResponseObj> {
        return this.httpClient.post<ResponseObj>(`${this.customerMethod}/update/${customer.id}`, customer);
    }

    public deleteCustomer(id: number): Observable<ResponseObj> {
        return this.httpClient.delete<ResponseObj>(`${this.customerMethod}/delete/${id}`);
    }

    public uploadImage(customerId: number, file: File, type: 'floor' | 'site'): Observable<ResponseObj> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        
        return this.httpClient.post<ResponseObj>(
            `${this.customerMethod}/upload-image/${customerId}/${type}`, 
            formData
        ).pipe(
            catchError(this.handleError)
        );
    }

    public uploadMultipleImages(
        customerId: number, 
        files: File[], 
        type: 'floor' | 'site' 
    ): Observable<ImageUploadResponse[]> {
        const uploadObservables = files.map(file => this.uploadImage(customerId, file, type));
        
        return forkJoin(uploadObservables).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';
        
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            if (error.status === 415) {
                errorMessage = 'Invalid file format. Please upload only JPG, JPEG or PNG files.';
            } else if (error.status === 413) {
                errorMessage = 'File size too large. Maximum size is 100MB.';
            } else if (error.status === 404) {
                errorMessage = 'Upload service not found. Please try again later.';
            } else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
        }
        
        return throwError(() => new Error(errorMessage));
    }

    public getLatestCustomerId(): Observable<{ lastId: string }> {
        return this.httpClient.get<{ lastId: string }>(`${this.customerMethod}/latest-id`);
    }
}