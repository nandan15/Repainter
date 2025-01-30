import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ResponseObj } from "../../models/login";
import { Paneling } from "../../models/paneling";
@Injectable({
    providedIn:'root'
})
export class WallPanelingService{
    baseUrl:string=environment.backend.baseURL;
    private wallpanelingMethod=this.baseUrl+"v1/wallpaneling";
    constructor(private httpClient:HttpClient){}
    public addWallPaneling(wallPaneling:Paneling):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(this.wallpanelingMethod+"/create",wallPaneling);
    }
    public listWallPaneling(query:string=""):Observable<any>{
        return this.httpClient.get<any>(this.wallpanelingMethod+query);
    }
    public updateWallPaneling(wallpaneling:Paneling):Observable<ResponseObj>{
        return this.httpClient.put<ResponseObj>(`${this.wallpanelingMethod}/update/${wallpaneling.panelingId}`,wallpaneling);
    }
    public deleteWallPaneling(wallPanelingId:number):Observable<ResponseObj>{
        return this.httpClient.delete<ResponseObj>(`${this.wallpanelingMethod}/delete/${wallPanelingId}`);
    }
    public getWallPanelingByCustomerId(customerId:number):Observable<Paneling[]>{
        return this.httpClient.get<Paneling[]>(`${this.wallpanelingMethod}/customer/${customerId}`)
    }
}