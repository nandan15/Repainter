export class Door_Grill {
  door_GrillId!: number;
  door_GrillTabId!: boolean;
  generatedId!: boolean;
  customerId!: number;

  // Arrays to store multiple entries
  mainDoors: MainDoor[] = [];
  internalDoors: InternalDoor[] = [];
  windowGrills: WindowGrill[] = [];
  balconyGrills: BalconyGrill[] = [];

  sectionTotal!: number;
  deleted!: boolean;
  createdBy!: number;
  createdOn!: Date;
  lastModifiedBy!: number;
  lastModifiedOn!: Date;
}

// Define the MainDoor interface
export interface MainDoor {
  length: number;
  height: number;
  numberOfDoors: number;
  surface: string;
  price: number;
  remarks: string;
}

// Define the InternalDoor interface
export interface InternalDoor {
  length: number;
  height: number;
  numberOfDoors: number;
  surface: string;
  price: number;
  remarks: string;
}

// Define the WindowGrill interface
export interface WindowGrill {
  length: number;
  height: number;
  price: number;
  remarks: string;
}

// Define the BalconyGrill interface
export interface BalconyGrill {
  length: number;
  height: number;
  price: number;
  remarks: string;
}