import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, throwError } from "rxjs";
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
        return this.httpClient.get<Customer>(`${this.customerMethod}/${id}`).pipe(
            catchError(this.handleError)
        );
    }
    
    public getCustomerImages(customerId: number): Observable<CustomerImagesModel> {
        return this.httpClient.get<CustomerImagesModel>(`${this.customerMethod}/images/${customerId}`).pipe(
            catchError(error => {
                console.error('Error fetching customer images:', error);
                return throwError(() => new Error('Failed to fetch customer images'));
            })
        );
    }

    public addCustomer(formData: FormData): Observable<{ success: boolean; customerId?: number; message?: string }> {
        return this.httpClient.post<any>(`${this.customerMethod}`,formData
        ).pipe(map(response => { return {
                    success: true,
                    customerId: response.id,
                    message: 'Customer added successfully'
                };
            }),
            catchError(this.handleError)
        );
    }
    
    public listCustomer(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(`${this.customerMethod}`).pipe(
            catchError(this.handleError)
        );
    }
    
    public updateCustomer(customer: Customer): Observable<{ success: boolean; message?: string }> {
        return this.httpClient.put<{ success: boolean; message?: string }>(
            `${this.customerMethod}/${customer.id}`,
            customer
        ).pipe(
            catchError(this.handleError)
        );
    }

    public deleteCustomer(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.customerMethod}/${id}`).pipe(
            catchError(this.handleError)
        );
    }
    public uploadImages(customerId: number, floorPlanImages: File[], sitePlanImages: File[]): Observable<any> {
        const formData = new FormData();
        if (floorPlanImages && floorPlanImages.length > 0) {
            floorPlanImages.forEach(file => {
                formData.append('floorPlanImages', file, file.name);
            });
        }
        if (sitePlanImages && sitePlanImages.length > 0) {
            sitePlanImages.forEach(file => {
                formData.append('sitePlanImages', file, file.name);
            });
        }
        
        return this.httpClient.post(
            `${this.customerMethod}/${customerId}/upload-images`, 
            formData
        ).pipe(
            catchError(this.handleError)
        );
    }
    
public uploadMultipleImages(customerId: number, files: File[], type: 'floor' | 'site'): Observable<ImageUploadResponse[]> {
    const formData = new FormData();
    const imageType = type === 'floor' ? 'floorPlanImages' : 'sitePlanImages';
    
    files.forEach(file => {
        formData.append(imageType, file, file.name);
    });
    
    return this.httpClient.post<ImageUploadResponse[]>(
        `${this.customerMethod}/${customerId}/upload-images`, 
        formData
    ).pipe(
        catchError(this.handleError)
    );
}
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }

    public getNextEnquiryId(): Observable<{ enquiryId: string }> {
        return this.httpClient.get<{ enquiryId: string }>(`${this.customerMethod}/next-id`);
      }
      public getImagesById(customerId: number): Observable<{success: boolean, data: {floorPlan: string[], sitePlan: string[]}, message?: string}> {
        return this.httpClient.get<any>(
          `${this.customerMethod}/${customerId}/physical-images`
        ).pipe(
          map(response => {
            // Transform the backend response to match our expected format
            return {
              success: true,
              data: {
                floorPlan: response.floorPlan || [],
                sitePlan: response.sitePlan || []
              },
              message: 'Images fetched successfully'
            };
          }),
          catchError(error => {
            console.error('Error fetching images by ID:', error);
            return throwError(() => ({
              success: false,
              message: 'Failed to fetch customer images'
            }));
          })
        );
      }
}