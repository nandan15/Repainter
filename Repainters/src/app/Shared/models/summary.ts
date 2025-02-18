export class Summary
{
    customerName!:string;
    projectName!:string;
    enquiryId!:string;
    address!:string;
    phoneNumber!:string;
    packageTotal!:number;
    curtainsTotal!:number;
    furnitureTotal!:number;
    internalPaintingTotal!:number;
    texturePaintingTotal!:number;
    wallpaperTotal!:number;
    panelingTotal!:number;
    doorGrillTotal!:number;
    overallTotal_PreTax!:number;
    overallTotal!:number;
    orderConfirmation!:number;
    designConfirmation!:number;
    projectHandover!:number;
    toVendorAmount?: number;
  overallTotalToVendor?: number;
}