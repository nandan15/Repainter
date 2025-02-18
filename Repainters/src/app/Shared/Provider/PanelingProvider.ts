import { Injectable } from "@angular/core";
import { Toast, ToastrService } from "ngx-toastr";
import { BehaviorSubject,forkJoin,Observable} from "rxjs";   
import { Paneling } from "../models/paneling";
import { WallPanelingService } from "../Service/Paneling/Paneling.service";
import Swal from "sweetalert2";
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
        addWallPaneling(wallPanelings: Paneling[]): Observable<any> {
            const observables = wallPanelings.map(wallPaneling =>
                this.wallPanelingService.addWallPaneling(wallPaneling)
            );
        
            return new Observable(subscriber => {
                forkJoin(observables).subscribe({
                    next: (responses) => {
                        const updatedWallPanelings = [...this.wallPanelingList.wallPaneling];
        
                        responses.forEach((data, index) => {
                            const paneling = wallPanelings[index];
                            paneling.panelingId = data["created_id"];
                            paneling.createdOn = paneling.createdOn || new Date();
                            paneling.lastModifiedOn = new Date();
                            
                            updatedWallPanelings.push(paneling);
                        });
        
                        this.wallPanelingList.wallPaneling = updatedWallPanelings;
                        this._wallPaneling.next([...updatedWallPanelings]); // Emit new state
        
                        this.toaster.success("Wall Paneling Confirmed Successfully", "Confirmation");
        
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Wall Paneling added successfully',
                            confirmButtonText: 'OK'
                        });
        
                        subscriber.next(responses);
                        subscriber.complete();
                    },
                    error: (error) => {
                        console.error("Error adding wall paneling:", error);
                        this.toaster.error("Failed to add Wall Paneling", "Error");
        
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to save Wall Paneling.',
                            confirmButtonText: 'OK'
                        });
        
                        subscriber.error(error);
                    }
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