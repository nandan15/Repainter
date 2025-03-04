import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { Furniture } from "../models/furniture";
import { FurnitureSerivce } from "../Service/Furniture/furniture.service";
import { ResponseObj } from "../models/login";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class FurnitureProvider {
    private _furniture = new BehaviorSubject<Furniture[]>([]);
    furnitureList: { furniture: Furniture[] } = { furniture: [] };
    
    get furniture() {
        return this._furniture.asObservable();
    }
    
    private _furnitures = new BehaviorSubject<Furniture>(new Furniture);
    currentFurniture: { _furnitures: Furniture } = { _furnitures: new Furniture() };
    
    get furnitures() {
        return this._furnitures.asObservable();
    }

    constructor(
        private furnitureService: FurnitureSerivce,
        private toaster: ToastrService
    ) {}

    addFurniture(furniture: Furniture): Observable<ResponseObj> {
        return this.furnitureService.addFurniture(furniture).pipe(
            tap({
                next: (response: ResponseObj) => {
                    furniture.furnitureId = response.created_id;
                    furniture.createdOn = furniture.createdOn || new Date();
                    furniture.lastModifiedOn = new Date();
                    this.furnitureList.furniture.push(furniture);
                    this._furniture.next([...this.furnitureList.furniture]);
                    this.toaster.success("Furniture Confirmed Successfully", "Confirmation");
    
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Furniture data saved successfully',
                        confirmButtonText: 'OK'
                    });
                },
                error: (error) => {
                    this.toaster.error("Failed to add Furniture", "Error");
                    console.error('Error adding furniture:', error);
    
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to save furniture data.',
                        confirmButtonText: 'OK'
                    });
                }
            })
        );
    }
    
    updateFurniture(furniture: Furniture): Observable<ResponseObj> {
        return this.furnitureService.updateFurniture(furniture).pipe(
            tap((response: ResponseObj) => {
                furniture.lastModifiedOn = new Date();
                const index = this.furnitureList.furniture.findIndex(
                    (n) => n.furnitureId === furniture.furnitureId
                );
                if (index !== -1) {
                    this.furnitureList.furniture[index] = furniture;
                }
                this._furniture.next(Object.assign({}, this.furnitureList).furniture);
                this.toaster.success("Furniture Updated Successfully", "Confirmation");
            })
        );
    }

    listFurniture(query: string = ""): Observable<Furniture[]> {
        return this.furnitureService.listFurniture(query).pipe(
            tap((data: Furniture[]) => {
                this.furnitureList.furniture = data;
                this._furniture.next(Object.assign({}, this.furnitureList).furniture);
            })
        );
    }

    getFurnitureByCustomerId(customerId: number, options: { deleted: number }): Observable<Furniture[]> {
        return this.furnitureService.getFurnitureByCustomerId(customerId).pipe(
            tap((data: Furniture[]) => {
                if (data && data.length > 0) {
                    this.furnitureList.furniture = data;
                    this._furniture.next(Object.assign({}, this.furnitureList).furniture);
                }
            })
        );
    }

    deleteFurniture(furnitureId: number): Observable<ResponseObj> {
        return this.furnitureService.deleteFurniture(furnitureId).pipe(
            tap((response: ResponseObj) => {
                const index = this.furnitureList.furniture.findIndex(
                    (n) => n.furnitureId === furnitureId
                );
                if (index !== -1) {
                    this.furnitureList.furniture.splice(index, 1);
                    this._furniture.next(Object.assign({}, this.furnitureList).furniture);
                }
                this.toaster.success("Furniture Deleted Successfully", "Confirmation");
            })
        );
    }
}