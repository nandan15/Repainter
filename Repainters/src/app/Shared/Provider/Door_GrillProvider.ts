import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { Door_Grill } from "../models/door_grill";
import { Door_GrillService } from "../Service/Door_Grill/door_grills.service";
import { catchError, tap } from "rxjs/operators";
import { ResponseObj } from "../models/login";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class Door_GrillProvider {
    private _door_grill = new BehaviorSubject<Door_Grill[]>([]);
    door_grillList: { door_grill: Door_Grill[] } = { door_grill: [] };

    get door_grill() {
        return this._door_grill.asObservable();
    }

    constructor(private doorGrillService: Door_GrillService, private toaster: ToastrService) {}

    addDoor_Grill(door_grill: any): Observable<ResponseObj> {
      return this.doorGrillService.addDoor_Grill(door_grill).pipe(
          tap({
              next: (data: ResponseObj) => {
                  this.toaster.success("Door Grill Confirmed Successfully", "Confirmation");
  
                  Swal.fire({
                      icon: 'success',
                      title: 'Success!',
                      text: 'Door Grill data saved successfully',
                      confirmButtonText: 'OK'
                  });
              },
              error: (error) => {
                  this.toaster.error("Failed to add Door Grill", "Error");
                  console.error('Error adding door grill:', error);
  
                  Swal.fire({
                      icon: 'error',
                      title: 'Error!',
                      text: 'Failed to save Door Grill data.',
                      confirmButtonText: 'OK'
                  });
              }
          })
      );
  }
  

    listDoor_Grill(): void {
        this.doorGrillService.listDoor_Grill().subscribe((data) => {
            this.door_grillList.door_grill = data as Door_Grill[];
            this._door_grill.next([...this.door_grillList.door_grill]);
        }, error => {
            this.toaster.error("Failed to load Door Grills", "Error");
        });
    }

    updateDoor_Grill(door_grill: Door_Grill): Observable<ResponseObj> {
        return this.doorGrillService.updateDoor_Grill(door_grill).pipe(
            tap((data: ResponseObj) => {
                door_grill.lastModifiedOn = new Date();
                const index = this.door_grillList.door_grill.findIndex(n => n.door_GrillId === door_grill.door_GrillId);

                if (index !== -1) {
                    this.door_grillList.door_grill[index] = door_grill; // Update the existing Door Grill
                }

                this._door_grill.next([...this.door_grillList.door_grill]);
                this.toaster.success("Door Grill Updated Successfully", "Confirmation");
            }),
            catchError((error: any) => {
                this.toaster.error("Failed to update Door Grill", "Error");
                console.error('Error updating door grill:', error);
                throw error; // Rethrow the error to maintain observable chain
            })
        );
    }

    getDoor_GrillByCustomerId(customerId: number, params: { deleted: number }): Observable<any[]> {
        return this.doorGrillService.getDoor_GrillByCustomerId(customerId).pipe(
          tap((data: any[]) => {
            // You can add any additional processing here if needed
          }),
          catchError((error: any) => {
            this.toaster.error("Failed to load Door Grill data", "Error");
            console.error('Error loading door grill data:', error);
            throw error;
          })
        );
      }
}