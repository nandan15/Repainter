import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, forkJoin, from, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Wallpaper } from "../models/wallpaper";
import { WallpaperSerivce } from "../Service/Wallpaper/Wallpaper.service";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class WallpaperProvider {
    private _wallpaper = new BehaviorSubject<Wallpaper[]>([]);
    wallpaperList: { wallpaper: Wallpaper[] } = { wallpaper: [] };
    getPaginatedData: any;

    get wallpaper() {
        return this._wallpaper.asObservable();
    }

    private _wallpapers = new BehaviorSubject<Wallpaper>(new Wallpaper);
    currentWallpaper: { _wallpapers: Wallpaper } = { _wallpapers: new Wallpaper() };

    get wallpapers() {
        return this._wallpapers.asObservable();
    }

    constructor(
        private WallpaperSerivce: WallpaperSerivce,
        private toaster: ToastrService
    ) { }

    addWallpaper(wallpapers: Wallpaper[]): Observable<any> {
        const addObservables = wallpapers.map(wallpaper =>
            this.WallpaperSerivce.addWallpaper(wallpaper).pipe(
                tap((data) => {
                    wallpaper.wallpaperId = data["created_id"];
                    this.wallpaperList.wallpaper.push(wallpaper);
                })
            )
        );
    
        return forkJoin(addObservables).pipe(
            tap(() => {
                this._wallpaper.next([...this.wallpaperList.wallpaper]);
                this.toaster.success("Wallpaper Confirmed Successfully", "Confirmation");
    
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Wallpaper added successfully.',
                    confirmButtonText: 'OK'
                });
            }),
            catchError((error) => {
                console.error("Error adding wallpaper:", error);
                this.toaster.error("Failed to add Wallpaper", "Error");
    
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to save Wallpaper.',
                    confirmButtonText: 'OK'
                });
    
                return throwError(error);
            })
        );
    }
    

    listWallpaper(): void {
        this.WallpaperSerivce.listWallpaper().subscribe((data) => {
            this.wallpaperList.wallpaper = data as Wallpaper[];
            this._wallpaper.next(Object.assign({}, this.wallpaperList).wallpaper);
        });
    }

    updateWallpaper(wallpapers: Wallpaper[]): Observable<any> {
        const updateObservables = wallpapers.map(wallpaper =>
            this.WallpaperSerivce.updateWallpaper(wallpaper).pipe(
                tap(() => {
                    const index = this.wallpaperList.wallpaper.findIndex(n => n.wallpaperId === wallpaper.wallpaperId);
                    if (index !== -1) {
                        this.wallpaperList.wallpaper[index] = wallpaper;
                    }
                })
            )
        );

        return forkJoin(updateObservables).pipe(
            tap(() => {
                this._wallpaper.next([...this.wallpaperList.wallpaper]);
                this.toaster.success("Wallpaper Updated Successfully", "Confirmation");
            })
        );
    }

    getWallpaperByCustomerId(customerId: number, params: { deleted: number }): Observable<Wallpaper[]> {
        return this.WallpaperSerivce.getWallpaperByCustomerId(customerId).pipe(
          tap(data => {
            console.log('Wallpaper data received:', data);
            this._wallpaper.next(data);
          }),
          catchError(error => {
            console.error('Error fetching wallpaper data:', error);
            this.toaster.error('Failed to fetch wallpaper data');
            return throwError(() => error);
          })
        );
      }
       deleteWallpaper(wallpaper: Wallpaper): Observable<any> {
                  return new Observable(observer => {
                      this.WallpaperSerivce.deleteWallpaper(wallpaper.wallpaperId).subscribe(
                          (response) => {
                              this.wallpaperList.wallpaper = this.wallpaperList.wallpaper
                                  .filter(item => item.wallpaperId !== wallpaper.wallpaperId);
                              this._wallpaper.next([...this.wallpaperList.wallpaper]);
                              this.toaster.success("Wallpaper Deleted Successfully", "Success");
                              observer.next(response);
                              observer.complete();
                          },
                          (error) => {
                              this.toaster.error("Failed to delete Wallpaper", "Error");
                              observer.error(error);
                          }
                      );
                  });
              }
}