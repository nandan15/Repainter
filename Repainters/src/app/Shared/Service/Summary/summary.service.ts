import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { Summary } from "../../models/summary";
import { ResponseObj } from "../../models/login";
@Injectable({
    providedIn: 'root'
})
export class SummaryService {
    baseUrl:string=environment.backend.baseURL;
    private summaryMethod=this.baseUrl +"v1/summary";
    constructor(private httpClient:HttpClient){}
    public getSummaryDataById(
        userId: number, 
        customerId: number, 
        toVendorAmount?: number
      ): Observable<Summary> {
        let url = `${this.summaryMethod}?userId=${userId}&customerId=${customerId}`;
        
        if (toVendorAmount) {
          url += `&toVendorAmount=${toVendorAmount}`;
        }
    
        return this.httpClient.get<Summary>(url);
      }
}