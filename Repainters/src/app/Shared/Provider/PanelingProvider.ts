import { Injectable } from "@angular/core";
import { Toast, ToastrService } from "ngx-toastr";
import { BehaviorSubject,Observable} from "rxjs";   
import { Paneling } from "../models/paneling";
import { WallPanelingService } from "../Service/Paneling/Paneling.service";
@Injectable({
    providedIn:'root'
})
export class WallPanelingProvider{
    private _wallPaneling=new BehaviorSubject<Paneling[]>([]);
    wallPanelingList:{wallPaneling:Paneling[]}={
        wallPaneling:[]};
        getPaginatedData:any;
        get wallPaneling(){
            return this._wallPaneling.asObservable();
        }
        private _wallPanelings=new BehaviorSubject<Paneling>(new Paneling());
        currentWallPaneling:{_wallPanelings:Paneling}={_wallPanelings:new Paneling()};
        get addwallPanelings(){
            return this._wallPanelings.asObservable();
        }
        constructor(private wallPanelingService:WallPanelingService,private toaster:ToastrService){}
        addWallPaneling(wallPanelings:Paneling[]){
            wallPanelings.forEach(wallPanelings=>{
                this.wallPanelingService.addWallPaneling(wallPanelings).subscribe((data)=>{
                    wallPanelings.panelingId=data["created_id"];
                    wallPanelings.createdOn=wallPanelings.createdOn || new Date();
                    wallPanelings.lastModifiedOn=new Date();
                    this._wallPaneling.next([...this.wallPanelingList.wallPaneling,wallPanelings]);
                    this.toaster.success("WallPaneling confirmed successfully","Confirmation");
                });
            });
        }
        listWallPaneling(){
            this.wallPanelingService.listWallPaneling().subscribe((data)=>{
                this.wallPanelingList.wallPaneling=data as Paneling[];
                this._wallPaneling.next(Object.assign({},this.wallPanelingList).wallPaneling);
            });
        }
        updateWallPaneling(wallpaneling:Paneling)
        {
            this.wallPanelingService.updateWallPaneling(wallpaneling).subscribe((data)=>{
                wallpaneling.lastModifiedOn=new Date();
                const index=this.wallPanelingList.wallPaneling.findIndex(n=>n.panelingId==wallpaneling.panelingId);
                if(index !=-1){
                    this.wallPanelingList.wallPaneling[index]=wallpaneling;
                }
                this._wallPaneling.next([...this.wallPanelingList.wallPaneling]);
                    this.toaster.success("WallPaneling updated Successfully","Confirmation");
            });
        }
        getWallPanelingByCustomerId(customerId:number,p0:{delete:number;}):Observable<Paneling[]>{
            return this.wallPanelingService.getWallPanelingByCustomerId(customerId);
        }
    }