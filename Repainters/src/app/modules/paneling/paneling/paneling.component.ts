import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Paneling } from 'src/app/Shared/models/paneling';
import { WallPanelingProvider } from 'src/app/Shared/Provider/PanelingProvider';

interface ProductDetail {
  type: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-paneling',
  templateUrl: './paneling.component.html',
  styleUrls: ['./paneling.component.css']
})
export class PanelingComponent implements OnInit {
  panelingForm!: FormGroup;
  customerId: number | null = null;

   @Input() currentwallPaneling: Paneling = new Paneling();

   private productDetails: { [key: string]: ProductDetail } = {
     'HCP001': { type: 'Cappuccino', price: 141900, description: 'Supply and Installation of designer panels as per selection on 1 entire wall up to area of 100 sqft' },
     // Add other product details as needed...
   };

   constructor(private fb: FormBuilder,
               private panelingProvider: WallPanelingProvider,
               private route: ActivatedRoute) {}

   ngOnInit() {
     this.initializeForm();
     for (let i = 0; i < 4; i++) {
       this.addWall();
     }

     // Add value change listener to product code
     this.wallsArray.controls.forEach((wallControl, index) => {
       wallControl.get('productCode')?.valueChanges.subscribe(productCode => {
         this.updateProductDetails(index, productCode);
       });
     });
     
     this.extractCustomerId();
   }

   initializeForm() {
     this.panelingForm = this.fb.group({
       walls: this.fb.array([]),
       sectionTotal: [0]
     });
   }

   private extractCustomerId() {
     this.route.parent?.paramMap.subscribe(params => {
       const customerIdParam = params.get('customerId');
       this.customerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
     });
     
     this.route.paramMap.subscribe(params => {
       const customerIdParam = params.get('customerId');
       if (customerIdParam) {
         this.customerId = parseInt(customerIdParam, 10);
       }
     });
     
     if (this.currentwallPaneling && this.currentwallPaneling.customerId) {
       this.customerId = this.currentwallPaneling.customerId;
     }
   }

   get wallsArray(): FormArray {
     return this.panelingForm.get('walls') as FormArray;
   }

   createWallFormGroup(): FormGroup {
     return this.fb.group({
       productCode: [''],
       type: [''],
       price: [0],
       description: [''],
       remarks: [''],
       lighting: [''], // Control for lighting selection
       lightingPrice: [0] // New field for lighting price
     });
   }

   addWall() {
     const walls = this.panelingForm.get('walls') as FormArray;
     walls.push(this.createWallFormGroup());

     const newWallIndex = walls.length - 1;

     const wallControl = walls.at(newWallIndex) as FormGroup; // Cast to FormGroup
     wallControl.addControl('lighting', this.fb.control(''));
     wallControl.addControl('lightingPrice', this.fb.control(0)); // New control

     wallControl.get('productCode')?.valueChanges.subscribe(productCode => {
       this.updateProductDetails(newWallIndex, productCode);
     });
   }

   removeWall(index: number) {
     const walls = this.panelingForm.get('walls') as FormArray;
     walls.removeAt(index);
   }

   private updateProductDetails(index: number, productCode: string) {
     const productInfo = this.productDetails[productCode];

     if (productInfo) {
       const wallControl = this.wallsArray.at(index);

       wallControl.patchValue({
         type: productInfo.type,
         price: productInfo.price,
         description: productInfo.description
       }, { emitEvent: false }); 
       
       // Reset lighting price when a new product code is entered
       wallControl.patchValue({
         lightingPrice: 0,
         lighting: ''
       });
     }
   }

   updateLightingPrice(index: number) {
     const wallControl = this.wallsArray.at(index);

     const lightingType = wallControl.get('lighting')?.value;

     let newLightingPrice = 0; // Default value
     if (lightingType === '2Side') {
       newLightingPrice = 4500; // Price for 2 Side Cove Light
     } else if (lightingType === '1Side') {
       newLightingPrice = 3500; // Price for 1 Side Cove Light
     }

     // Update the lighting price field in the form
     wallControl.patchValue({
       lightingPrice: newLightingPrice
     });
   }

   OnConfirmPaneling() {
      if (!this.customerId) {
        console.error('Customer Id is required');
        return;
      }
  
      const wallPanelings = this.wallsArray.controls.map(group => ({
        panelingId: 0, // Assuming default value or generate as needed
        generatedId: Math.floor(Math.random() * 10000), // Example of generating an ID
        panelingTabId: 1, // Set as per your logic
        deleted: false, // Default value
        customerId: this.customerId,
        productCode: group.get('productCode')?.value.toString(),
        type: group.get('type')?.value.toString(),
        price: group.get('price')?.value,
        description: group.get('description')?.value,
        remarks: group.get('remarks')?.value,
        lightingPrice: group.get('lightingPrice')?.value,
        sectionTotal: this.panelingForm.get('sectionTotal')?.value.toString()
      } as Paneling));
  
      // Call the provider to add wall panelings
      this.panelingProvider.addWallPaneling(wallPanelings);
    }
}
