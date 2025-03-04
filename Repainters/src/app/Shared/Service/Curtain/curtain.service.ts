import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObjectUnsubscribedError, Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ResponseObj } from "../../models/login";
import { TmplAstHoverDeferredTrigger } from "@angular/compiler";
import { Curtain } from "../../models/curtain";
@Injectable({
    providedIn:'root'
})
export class CurtainSerivce{
    baseUrl:string=environment.backend.baseURL;
    private curtainMethod=this.baseUrl + "v1/curtain";
    constructor(private httpClient:HttpClient){}
    public addCurtain(curtain:Curtain):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(this.curtainMethod+"/create",curtain);
    }
    public listCurtain(query:string=""):Observable<any>{
        return this.httpClient.get<any>(this.curtainMethod+query);
    }
    public updateCurtain(curtain:Curtain):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(`${this.curtainMethod}/update/${curtain.curtainId}`,curtain);
    }
    public deleteCurtain(curtainId:number):Observable<ResponseObj>{
        return this.httpClient.delete<ResponseObj>(`${this.curtainMethod}/delete/${curtainId}`);
    }
    public getcurtainByCustomerId(customerId: number): Observable<Curtain[]> {
        return this.httpClient.get<Curtain[]>(`${this.curtainMethod}/customer/${customerId}`);
      }
}