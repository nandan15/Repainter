import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { Package } from "../models/package";
import { PackageService } from "../Service/Package/Package.service";

@Injectable({
    providedIn: 'root'
})
export class PackageProvider {
    private _package = new BehaviorSubject<Package[]>([]);
    packageList: { package: Package[] } = { package: [] };

    get package$(): Observable<Package[]> {
        return this._package.asObservable();
    }

    private _currentPackage = new BehaviorSubject<Package>(new Package());

    get currentPackage$(): Observable<Package> {
        return this._currentPackage.asObservable();
    }

    constructor(
        private packageService: PackageService, 
        private toaster: ToastrService
    ) {}

    addPackage(packages: Package[]): void {
        packages.forEach(pkg => {
            this.packageService.addPackage(pkg).subscribe({
                next: (data) => {
                    pkg.packageId = data["created_id"];
                    pkg.createdOn = pkg.createdOn || new Date();
                    pkg.lastModifiedDate = new Date();
                    
                    const updatedPackages = [...this.packageList.package, pkg];
                    this.packageList.package = updatedPackages;
                    this._package.next(updatedPackages);
                    
                    this.toaster.success("Package Confirmed Successfully", "Confirmation");
                },
                error: (err) => {
                    this.toaster.error("Failed to add package", "Error");
                    console.error(err);
                }
            });
        });
    }

    listPackage(): void {
        this.packageService.listPackage().subscribe({
            next: (data) => {
                this.packageList.package = data as Package[];
                this._package.next([...this.packageList.package]);
            },
            error: (err) => {
                this.toaster.error("Failed to list packages", "Error");
                console.error(err);
            }
        });
    }

    updatePackage(packages: Package): void {
        this.packageService.updatePackage(packages).subscribe({
            next: () => {
                packages.lastModifiedDate = new Date();
                const index = this.packageList.package.findIndex(n => n.packageId === packages.packageId);
                
                if (index !== -1) {
                    this.packageList.package[index] = packages;
                }
                
                this._package.next([...this.packageList.package]);
                this.toaster.success("Package Updated Successfully", "Confirmation");
            },
            error: (err) => {
                this.toaster.error("Failed to update package", "Error");
                console.error(err);
            }
        });
    }
    
}