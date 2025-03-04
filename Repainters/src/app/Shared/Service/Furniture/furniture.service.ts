import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObjectUnsubscribedError, Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ResponseObj } from "../../models/login";
import { TmplAstHoverDeferredTrigger } from "@angular/compiler";
import { Furniture } from "../../models/furniture";

@Injectable({
    providedIn:'root'
})
export class FurnitureSerivce{
    baseUrl:string=environment.backend.baseURL;
    private furnitureMethod=this.baseUrl + "v1/furniture";
    constructor(private httpClient:HttpClient){}

    public addFurniture(furniture:Furniture):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(this.furnitureMethod+"/create",furniture);
    }

    public listFurniture(query:string=""):Observable<any>{
        return this.httpClient.get<any>(this.furnitureMethod+query);
    }

    public updateFurniture(furniture:Furniture):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(`${this.furnitureMethod}/update/${furniture.furnitureId}`,furniture);
    }

    public deleteFurniture(furnitureId:number):Observable<ResponseObj>{
        return this.httpClient.delete<ResponseObj>(`${this.furnitureMethod}/delete/${furnitureId}`);
    }

    public getFurnitureByCustomerId(customerId: number): Observable<Furniture[]> {
        return this.httpClient.get<Furniture[]>(`${this.furnitureMethod}/customer/${customerId}`);
    }
}