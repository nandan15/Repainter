export class Curtain {
  curtainId: number;
  curtainTabId: boolean;
  generatedId: boolean;
  customerId: number;
  
  // Balcony curtain fields
  curtainType: string;
  fabricType: string;
  productCode: string;
  price: number;  // Decimal in C#
  curtainRemarks: string;
  
  // Balcony rod fields
  rodType: string;
  rodProductCode: string;
  rodPrice: number;  // Decimal in C#
  rodRemarks: string;
  
  // Balcony finial fields
  finialType: string;
  finialProductCode: string;
  finialPrice: number;  // Decimal in C#
  finialRemarks: string;
  
  // Window curtain fields
  windowCurtainType: string;
  windowFabricType: string;
  windowCurtainProductCode: string;
  windowCurtainPrice: number;  // Decimal in C#
  windowCurtainRemarks: string;
  
  // Window rod fields
  windowRodType: string;
  windowRodProductCode: string;
  windowRodPrice: number;  // Decimal in C#
  windowRodRemarks: string;
  
  // Window finial fields
  windowFinialType: string;
  windowFinialProductCode: string;
  windowFinialPrice: number;  // Decimal in C#
  windowFinialRemarks: string;
  
  // Section totals
  sectionTotalCurtain: string;  // String in C#
  sectionTotalWindow: number;   // Decimal in C#
  sectionTotal: number;         // Decimal in C#
  
  // Meta fields
  deleted: boolean;
  createdBy: number;
  createdOn: Date;
  lastModifiedBy: number;
  lastModifiedOn: Date;

  constructor() {
    this.curtainId = 0;
    this.curtainTabId = false;
    this.generatedId = false;
    this.customerId = 0;
    
    // Initialize string fields
    this.curtainType = '';
    this.fabricType = '';
    this.productCode = '';
    this.curtainRemarks = '';
    this.rodType = '';
    this.rodProductCode = '';
    this.rodRemarks = '';
    this.finialType = '';
    this.finialProductCode = '';
    this.finialRemarks = '';
    this.windowCurtainType = '';
    this.windowFabricType = '';
    this.windowCurtainProductCode = '';
    this.windowCurtainRemarks = '';
    this.windowRodType = '';
    this.windowRodProductCode = '';
    this.windowRodRemarks = '';
    this.windowFinialType = '';
    this.windowFinialProductCode = '';
    this.windowFinialRemarks = '';
    this.price = 0;
    this.rodPrice = 0;
    this.finialPrice = 0;
    this.windowCurtainPrice = 0;
    this.windowRodPrice = 0;
    this.windowFinialPrice = 0;
    this.sectionTotalCurtain = '0';  // Initialize as string
    this.sectionTotalWindow = 0;     // Keep as number
    this.sectionTotal = 0;           // Keep as number
    this.deleted = false;
    this.createdBy = 0;
    this.createdOn = new Date();
    this.lastModifiedBy = 0;
    this.lastModifiedOn = new Date();
  }
}
export interface ResponseObj {
  created_id: number;
  message?: string;
  success?: boolean;
  data?: any;
}