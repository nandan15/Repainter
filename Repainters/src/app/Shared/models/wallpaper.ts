export class Wallpaper{
    wallpaperId!:number;
    customerId!: number;
    productType!:string;
    productCode!:string;
    noOfRolls!:number;
    price!:number;
    remarks!:string;
    sectionTotal!:string;
    deleted!:boolean;
    createdBy?: number;
    lastModifiedDate?: Date;
    lastModifiedBy?: number;
    createdOn?: Date;
}