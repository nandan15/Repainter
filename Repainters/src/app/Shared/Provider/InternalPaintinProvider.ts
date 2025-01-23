import { Injectable } from "@angular/core";
import { InternalPainting } from "../models/internalpainting";
import { InternalPaintingSerivce } from "../Service/InternalPainting/InternalPainting.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class InternalPaintinProvider{
    private _internalPainting=new BehaviorSubject<InternalPainting[]>([]);
    internalPaintingList:{internalPainting:InternalPainting[]}={internalPainting:[]};
    getPaginatedData:any;
    get internalPainting(){
        return this._internalPainting.asObservable();
    }
    private _internalPaintings=new BehaviorSubject<InternalPainting>(new InternalPainting);
    currentInternalPainting:{_internalPaintings:InternalPainting}={_internalPaintings:new InternalPainting()};
    get internalPaintings()
    {
        return this._internalPaintings.asObservable();
    }
    constructor(private InternalPaintingService:InternalPaintingSerivce,private toaster:ToastrService){}
    addInternalPainting(internalPainting:InternalPainting){
        this.InternalPaintingService.addInternalPainting(internalPainting).subscribe((data)=>{
            internalPainting.internalPaintingId=data["created_id"];
            internalPainting.createdOn = internalPainting.createdOn || new Date();
            internalPainting.lastModifiedDate = new Date();
            this.internalPaintingList.internalPainting.push(internalPainting)
            this._internalPainting.next(Object.assign({},this.internalPaintingList).internalPainting)
            this.toaster.success("Internal Painting Confirmed Successfully", "Confirmation");
        });
    }
    listInternalPainting()
    {
        this.InternalPaintingService.listInternalPainting().subscribe((data)=>{
            this.internalPaintingList.internalPainting=data as InternalPainting[];
            this._internalPainting.next(Object.assign({},this.internalPaintingList).internalPainting);
        });
    }
    updateInternalPainting(internalPainting:InternalPainting){
        this.InternalPaintingService.updateInternalPainting(internalPainting).subscribe((data)=>{
            internalPainting.lastModifiedDate = new Date();
            let index=this.internalPaintingList.internalPainting.findIndex((n)=>n.internalPaintingId==internalPainting.internalPaintingId);
            this._internalPainting.next(Object.assign({},this.internalPaintingList).internalPainting);
            this.toaster.success("Internal Painting Updated Successfully", "Confirmation");
    });
}
getInternalPaintingByCustomerId(customerId: number, p0: { deleted: number; }): Observable<InternalPainting[]> {
    return this.InternalPaintingService.getInternalPaintingByCustomerId(customerId);
  }
}