export class Customer {
  id!: number;
  enquiryId!: string;
  title!: string;
  name!: string;
  phoneNumber!: string;
  alternatePhoneNumber!: string;
  emailId!: string;
  projectName!: string;
  houseNo!: string;
  projectType!: string;
  configurtion!: string;
  carpetArea!: string;
  projectLocation!: string;
  city!: string;
  floorPlan!: string[];
  sitePlan!: string[];
}
export interface CustomerImagesModel {
  success: boolean;
  data: CustomerImageData[];
  message?: string;
}

export interface CustomerImageData {
  customerId: number;
  floorPlanImages: string[];
  sitePlanImages: string[];
}

export interface InternalErrorViewModel {
  message: string;
}