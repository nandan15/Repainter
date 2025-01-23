import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { Wallpaper } from "../models/wallpaper";
import { WallpaperSerivce } from "../Service/Wallpaper/Wallpaper.service";
@Injectable({
    providedIn:'root'
})
export class WallpaperProvider{
    private _wallpaper=new BehaviorSubject<Wallpaper[]>([]);
    wallpaperList:{wallpaper:Wallpaper[]}={wallpaper:[]};
    getPaginatedData:any;
    get wallpaper(){
        return this._wallpaper.asObservable();
    }
    private _wallpapers=new BehaviorSubject<Wallpaper>(new Wallpaper);
    currentWallpaper:{_wallpapers:Wallpaper}={_wallpapers:new Wallpaper()};
    get wallpapers()
    {
        return this._wallpapers.asObservable();
    }
    constructor(private WallpaperSerivce :WallpaperSerivce,private toaster:ToastrService){}
    addWallpaper(wallpapers: Wallpaper[]) {
        wallpapers.forEach(wallpaper => {
            this.WallpaperSerivce.addWallpaper(wallpaper).subscribe((data) => {
                wallpaper.wallpaperId = data["created_id"];
                wallpaper.createdOn = wallpaper.createdOn || new Date();
                wallpaper.lastModifiedDate = new Date();
                this.wallpaperList.wallpaper.push(wallpaper);
                this._wallpaper.next([...this.wallpaperList.wallpaper]);
                this.toaster.success("Wallpaper Confirmed Successfully", "Confirmation");
            });
        });
    }
    listWallpaper()
    {
        this.WallpaperSerivce.listWallpaper().subscribe((data)=>{
            this.wallpaperList.wallpaper=data as Wallpaper[];
            this._wallpaper.next(Object.assign({},this.wallpaperList).wallpaper);
        });
    }
    updateWallpaper(wallpapers: Wallpaper[]) {
        wallpapers.forEach(wallpaper => {
            this.WallpaperSerivce.updateWallpaper(wallpaper).subscribe(() => {
                wallpaper.lastModifiedDate = new Date();
                const index = this.wallpaperList.wallpaper.findIndex(n => n.wallpaperId === wallpaper.wallpaperId);
                if (index !== -1) {
                    this.wallpaperList.wallpaper[index] = wallpaper;
                }
                this._wallpaper.next([...this.wallpaperList.wallpaper]);
                this.toaster.success("Wallpaper Updated Successfully", "Confirmation");
            });
        });
    }
// deleteInternalPainting(internalPainting:InternalPainting):void{
//     this.InternalPaintingService.deleteInternalPainting(internalPainting.internalPaintingId).subscribe(
//         (deleteInternalPainting)=>{
//             this.listInternalPainting();
//         },
//         (error)=>{
//             this.toaster.error("Failed to delete internalpainting","Error");
//         }
//         )
//     }
}