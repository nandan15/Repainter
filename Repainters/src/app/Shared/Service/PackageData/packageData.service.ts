import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { PackageData } from "../../models/PaackageData";

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {
  baseUrl: string = environment.backend.baseURL;
  private packageDataMethod = this.baseUrl + "v1/packageData";
  
  constructor(private httpClient: HttpClient) {}
  
  public listPackageData(query: string = ""): Observable<any> {
    return this.httpClient.get<any>(this.packageDataMethod + query);
  }
  
  public getPackageDataByProductCode(productCode: string): Observable<PackageData[]> {
    return this.httpClient.get<PackageData[]>(`${this.packageDataMethod}/productCode/${productCode}`);
  }
}