import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObjectUnsubscribedError, Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ResponseObj } from "../../models/login";
import { TmplAstHoverDeferredTrigger } from "@angular/compiler";
import { TexturePainting } from "../../models/texturepainting";
@Injectable({
    providedIn:'root'
})
export class TexturePaintingSerivce{
    baseUrl:string=environment.backend.baseURL;
    private texturePaintingMethod=this.baseUrl + "v1/texturepainting";
    constructor(private httpClient:HttpClient){}
    public addTexturePainting(texturepainting:TexturePainting):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(this.texturePaintingMethod+"/create",texturepainting);
    }
    public listTexturePainting(query:string=""):Observable<any>{
        return this.httpClient.get<any>(this.texturePaintingMethod+query);
    }
    public updateTexturePainting(texturepainting:TexturePainting):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(`${this.texturePaintingMethod}/update/${texturepainting.texturePaintingId}`,texturepainting);
    }
    public deleteTexturePainting(texturePaintingId:number):Observable<ResponseObj>{
        return this.httpClient.delete<ResponseObj>(`${this.texturePaintingMethod}/delete/${texturePaintingId}`);
    }
}