import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { Curtain,ResponseObj } from "../models/curtain";
import { CurtainSerivce } from "../Service/Curtain/curtain.service";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class CurtainProvider {
    private _curtains = new BehaviorSubject<Curtain[]>([]);
    curtainList: { curtains: Curtain[] } = { curtains: [] };
    
    get curtains() {
        return this._curtains.asObservable();
    }
    
    private _curtain = new BehaviorSubject<Curtain>(new Curtain());
    currentCurtain: { _curtain: Curtain } = { _curtain: new Curtain() };
    
    get curtain() {
        return this._curtain.asObservable();
    }

    constructor(
        private curtainService: CurtainSerivce,
        private toaster: ToastrService
    ) {}

    addCurtain(curtain: Curtain): Observable<ResponseObj> {
        return this.curtainService.addCurtain(curtain).pipe(
            tap({
                next: (response: ResponseObj) => {
                    curtain.curtainId = response.created_id;
                    curtain.createdOn = curtain.createdOn || new Date();
                    curtain.lastModifiedOn = new Date();
                    this.curtainList.curtains.push(curtain);
                    this._curtains.next([...this.curtainList.curtains]);
                    this.toaster.success("Curtain Confirmed Successfully", "Confirmation");
    
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Curtain data saved successfully',
                        confirmButtonText: 'OK'
                    });
                },
                error: (error) => {
                    console.error('Error adding curtain:', error);
    
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to save curtain data.',
                        confirmButtonText: 'OK'
                    });
                }
            })
        );
    }
    

    updateCurtain(curtain: Curtain): Observable<ResponseObj> {
        return this.curtainService.updateCurtain(curtain).pipe(
            tap((response: ResponseObj) => {
                curtain.lastModifiedOn = new Date();
                const index = this.curtainList.curtains.findIndex(
                    (n) => n.curtainId === curtain.curtainId
                );
                if (index !== -1) {
                    this.curtainList.curtains[index] = curtain;
                }
                this._curtains.next([...this.curtainList.curtains]);
                this.toaster.success("Curtain Updated Successfully", "Confirmation");
            })
        );
    }

    getCurtainByCustomerId(customerId: number): Observable<Curtain[]> {
        return this.curtainService.getcurtainByCustomerId(customerId).pipe(
          tap((data: Curtain[]) => {
            if (data && data.length > 0) {
              // Ensure proper type conversion for numeric values
              data = data.map(curtain => ({
                ...curtain,
                price: Number(curtain.price),
                rodPrice: Number(curtain.rodPrice),
                finialPrice: Number(curtain.finialPrice),
                windowCurtainPrice: Number(curtain.windowCurtainPrice),
                windowRodPrice: Number(curtain.windowRodPrice),
                windowFinialPrice: Number(curtain.windowFinialPrice),
                sectionTotalWindow: Number(curtain.sectionTotalWindow),
                sectionTotal: Number(curtain.sectionTotal)
              }));
              this.curtainList.curtains = data;
              this._curtains.next([...this.curtainList.curtains]);
            }
          })
        );
      }
}