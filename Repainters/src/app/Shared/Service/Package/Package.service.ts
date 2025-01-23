import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ResponseObj } from "../../models/login";
import { Package } from "../../models/package";

@Injectable({
    providedIn: 'root'
})
export class PackageService {
    baseUrl: string = environment.backend.baseURL;
    private packageMethod = this.baseUrl + "v1/Package";

    constructor(private httpClient: HttpClient) {}

    public addPackage(packageObj: Package): Observable<ResponseObj> {
        return this.httpClient.post<ResponseObj>(this.packageMethod + "/create", packageObj);
    }

    public listPackage(query: string = ""): Observable<any> {
        return this.httpClient.get<any>(this.packageMethod + query);
    }

    public updatePackage(packageObj: Package): Observable<ResponseObj> {
        return this.httpClient.post<ResponseObj>(`${this.packageMethod}/update/${packageObj.packageId}`, packageObj);
    }

    public deletePackage(packageId: number): Observable<ResponseObj> {
        return this.httpClient.delete<ResponseObj>(`${this.packageMethod}/delete/${packageId}`);
    }
}
