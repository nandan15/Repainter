export class Customer {
  id!: number;
  enquiryId!: number;
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
  floorPlan: string[] = [];
  sitePlan: string[] = [];
}