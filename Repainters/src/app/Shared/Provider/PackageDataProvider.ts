import { Injectable } from "@angular/core";
import { PackageDataService } from "../Service/PackageData/packageData.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { PackageData } from "../models/PaackageData";

@Injectable({
  providedIn: 'root'
})
export class PackageDataProvider {
  private _packageData = new BehaviorSubject<PackageData[]>([]);
  packageDataList: { packageData: PackageData[] } = { packageData: [] };

  get packageData() {
    return this._packageData.asObservable();
  }

  private _packageDatas = new BehaviorSubject<PackageData>(new PackageData);
  currentPackageData: { _packageDatas: PackageData } = { _packageDatas: new PackageData() };

  get packageDatas() {
    return this._packageDatas.asObservable();
  }

  constructor(
    private PackageDataService: PackageDataService,
    private toaster: ToastrService
  ) {}

  listPackageData() {
    this.PackageDataService.listPackageData().subscribe((data) => {
      this.packageDataList.packageData = data as PackageData[];
      this._packageData.next(Object.assign({}, this.packageDataList).packageData);
    });
  }

  getPackageDataByProductCode(productCode: string): Observable<PackageData[]> {
    return this.PackageDataService.getPackageDataByProductCode(productCode);
  }
}