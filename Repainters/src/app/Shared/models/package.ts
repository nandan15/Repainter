export class Package
{
    packageId?:number;
    packageTabId!:boolean;
    generatedId!:boolean;
    customerId!:number;
    packageType!:string;
    productCode!:string;
    selectedCode!:string;
    type!:string;
    amount!:number;
    specification!:string;
    condition!:string;
    remarks!:string;
    sectionTotalPreTax!:number;
    sectionTotalPostTax!:number
    deleted!:boolean;
    createdBy?: number;
    lastModifiedDate?: Date;
    lastModifiedBy?: number;
    createdOn?: Date;
    constructor() {
        this.createdOn = new Date();
        this.lastModifiedDate = new Date();
    }
}