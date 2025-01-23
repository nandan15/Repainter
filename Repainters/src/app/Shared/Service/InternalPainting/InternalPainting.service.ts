import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObjectUnsubscribedError, Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { InternalPainting } from "../../models/internalpainting";
import { ResponseObj } from "../../models/login";
import { TmplAstHoverDeferredTrigger } from "@angular/compiler";
@Injectable({
    providedIn:'root'
})
export class InternalPaintingSerivce{
    baseUrl:string=environment.backend.baseURL;
    private internalPaintingMethod=this.baseUrl + "v1/internalpainting";
    constructor(private httpClient:HttpClient){}
    public addInternalPainting(internalpainting:InternalPainting):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(this.internalPaintingMethod+"/create",internalpainting);
    }
    public listInternalPainting(query:string=""):Observable<any>{
        return this.httpClient.get<any>(this.internalPaintingMethod+query);
    }
    public updateInternalPainting(internalpainting:InternalPainting):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(`${this.internalPaintingMethod}/update/${internalpainting.internalPaintingId}`,internalpainting);
    }
    public deleteInternalPainting(internalPaintingId:number):Observable<ResponseObj>{
        return this.httpClient.delete<ResponseObj>(`${this.internalPaintingMethod}/delete/${internalPaintingId}`);
    }
    public getInternalPaintingByCustomerId(customerId: number): Observable<InternalPainting[]> {
        return this.httpClient.get<InternalPainting[]>(`${this.internalPaintingMethod}/customer/${customerId}`);
      }
}