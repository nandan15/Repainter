import { DateAdapter } from "@angular/material/core";

export class Paneling
{
    panelingId!:number;
    customerId!:number;
    generatedId!:number;
    panelingTabId!:number;
    productCode!:string;
    type!:string;
    price!:number;
    description!:string;
    remarks!:string;
    sectionTotal!:number;
    deleted!:boolean;
    createdBy?: number;
    lastModifiedOn?: Date;
    lastModifiedBy?: number;
    createdOn?: Date;
    constructor() {
        this.createdOn = new Date();
        this.lastModifiedOn = new Date();
    }
}