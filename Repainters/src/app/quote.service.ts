import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'YOUR_API_URL_HERE'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCustomerQuoteSummary(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetCustomerQuoteSummary?CustomerId=${customerId}`);
  }
}