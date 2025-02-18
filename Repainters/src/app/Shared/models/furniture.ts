export class Furniture
{
    furnitureId?: number;
    furnitureTabId?: boolean;
    generatedId?: boolean;
    customerId!: number;
    productCode!: string;
    name!: string;
    price!: number;
    sectionTotal!: number;
    description!: string;
    remarks!: string;
    deleted!: boolean;
    createdOn?: Date;
    createdBy?: number;
    lastModifiedBy?: number;
    lastModifiedOn?: Date;
  }