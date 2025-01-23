export class InternalPainting {
    internalPaintingId?: number;
    customerId!: number;
    carpetArea!: number;
    ceilingType!: string;
    ceilingPrice!: number;
    ceilingRemarsk!: string;
    wallType!: string;
    wallPrice!: number;
    wallRemarks!: string;
    noofWall!: string; 
    darkPrice!: number;
    darkRemarks!: string;
    sectionTotalPost_tax!: number;
    sectionTotalPre_tax!: number;
    totalRemarks!: string;
    createdBy?: number;
    lastModifiedDate?: Date;
    lastModifiedBy?: number;
    createdOn?: Date;
    constructor() {
        this.createdOn = new Date();
        this.lastModifiedDate = new Date();
    }
}