import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ObjectUnsubscribedError, Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { ResponseObj } from "../../models/login";
import { TmplAstHoverDeferredTrigger } from "@angular/compiler";
import { Wallpaper } from "../../models/wallpaper";
@Injectable({
    providedIn:'root'
})
export class WallpaperSerivce{
    baseUrl:string=environment.backend.baseURL;
    private wallpaperMethod=this.baseUrl + "v1/wallpaper";
    constructor(private httpClient:HttpClient){}
    public addWallpaper(wallpaper:Wallpaper):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(this.wallpaperMethod+"/create",wallpaper);
    }
    public listWallpaper(query:string=""):Observable<any>{
        return this.httpClient.get<any>(this.wallpaperMethod+query);
    }
    public updateWallpaper(wallpaper:Wallpaper):Observable<ResponseObj>{
        return this.httpClient.post<ResponseObj>(`${this.wallpaperMethod}/update/${wallpaper.wallpaperId}`,wallpaper);
    }
    public deleteWallpaper(wallpaperId:number):Observable<ResponseObj>{
        return this.httpClient.delete<ResponseObj>(`${this.wallpaperMethod}/delete/${wallpaperId}`);
    }
    public getWallpaperByCustomerId(customerId:number):Observable<Wallpaper[]>{
        return this.httpClient.get<Wallpaper[]>(`${this.wallpaperMethod}/customer/${customerId}`);
    }
}