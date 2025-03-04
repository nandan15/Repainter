import { Injectable } from "@angular/core";
import { Summary } from "../models/summary";
import { SummaryService } from "../Service/Summary/summary.service";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, map, Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class SummaryProvider{
    private _summary=new BehaviorSubject<Summary[]>([]);
    summaryList:{summary:Summary[]}={summary:[]};
    getPaginatedData:any;
    get summary(){
        return this._summary.asObservable();
    }
    private _summaries=new BehaviorSubject<Summary>(new Summary);
    currentSummary:{_summaries:Summary}={_summaries:new Summary()};
    get summaries()
    {
        return this._summaries.asObservable();
    }
    constructor(private SummmaryService:SummaryService,private toaster:ToastrService){}
    getSummaryDataById(
        userId: number, 
        customerId: number, 
        toVendorAmount?: number
      ): Observable<Summary[]> {
        return this.SummmaryService.getSummaryDataById(userId, customerId, toVendorAmount)
          .pipe(
            map(summary => [summary]) // Convert single Summary to array
          );
      }

    }