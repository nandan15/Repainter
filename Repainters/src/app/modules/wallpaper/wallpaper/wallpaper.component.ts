import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Wallpaper } from 'src/app/Shared/models/wallpaper';
import { WallpaperProvider } from 'src/app/Shared/Provider/WallpaperProvider';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.css']
})
export class WallpaperComponent implements OnInit {
  wallpaperForm: FormGroup;
  customerId: number | null = null;
  productTypes = ['Budget', 'Premium', 'Luxury', 'Custom'];
  pricerates: { [key: string]: number } = {
    'Budget': 7500,
    'Premium': 15000,
    'Luxury': 25000,
    'Custom': 35000
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private wallpaperProvider: WallpaperProvider
  ) {
    this.wallpaperForm = this.fb.group({
      wallpapers: this.fb.array([]),
      wallpaperTotal: [0],
      totalRows: [0]
    });
  }

  ngOnInit(): void {
    this.extractCustomerId();
    this.setupDataRetrieval();
  }

  private extractCustomerId() {
    // Consolidate customer ID extraction
    this.route.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      this.customerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
      
      if (this.customerId) {
        this.retrieveWallpaperData(this.customerId);
      }
    });
  }

  private setupDataRetrieval() {
    this.route.parent?.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      const parentCustomerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
      
      if (parentCustomerId && parentCustomerId !== this.customerId) {
        this.customerId = parentCustomerId;
        this.retrieveWallpaperData(this.customerId);
      }
    });
  }

  private retrieveWallpaperData(customerId: number) {
    this.wallpaperProvider.getWallpaperByCustomerId(customerId, { deleted: 0 })
      .subscribe(wallpapers => {
        this.clearWallpapers();
        wallpapers.forEach(wallpaper => this.addWallpaperFromData(wallpaper));
      });
  }

  private clearWallpapers() {
    while (this.wallpapers.length !== 0) {
      this.wallpapers.removeAt(0);
    }
  }

  private addWallpaperFromData(wallpaper: Wallpaper) {
    const wallpaperGroup = this.fb.group({
      productType: [wallpaper.productType, Validators.required],
      productCode: [wallpaper.productCode, Validators.required],
      noOfRolls: [wallpaper.noOfRolls, [Validators.required, Validators.min(1), this.rollsLimitValidator]],
      price: [wallpaper.price, Validators.required],
      remarks: [wallpaper.remarks, Validators.required],
      sectionTotal: [wallpaper.sectionTotal, Validators.required],
    });

    this.wallpapers.push(wallpaperGroup);

    wallpaperGroup.valueChanges.subscribe(() => {
      this.calculatePrices();
    });

    this.updateRowCount();
  }

  get wallpapers(): FormArray {
    return this.wallpaperForm.get('wallpapers') as FormArray;
  }
  
  getWallpaperGroup(index: number): FormGroup {
    return this.wallpapers.at(index) as FormGroup;
  }
  

  rollsLimitValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value > 20 ? { rollsLimitExceeded: true } : null;
  }

  addNewWallpaper(): void {
    const wallpaperGroup = this.fb.group({
      productType: ['', Validators.required],
      productCode: ['', Validators.required],
      noOfRolls: [0, [Validators.required, Validators.min(1), this.rollsLimitValidator]],
      price: [0, Validators.required],
      remarks: ['', Validators.required],
      sectionTotal: ['', Validators.required],
    });

    this.wallpapers.push(wallpaperGroup);

    wallpaperGroup.valueChanges.subscribe(() => {
      this.calculatePrices();
    });

    this.updateRowCount();
  }

  onConfirmWallpaper() {
    if (!this.customerId) {
      console.error('Customer ID is required');
      return;
    }

    const wallpapers = this.wallpapers.controls.map((group) => {
      const wallpaper: Wallpaper = {
        customerId: this.customerId!,
        productType: group.get('productType')?.value,
        productCode: group.get('productCode')?.value,
        noOfRolls: group.get('noOfRolls')?.value,
        price: group.get('price')?.value,
        remarks: group.get('remarks')?.value,
        sectionTotal: group.get('sectionTotal')?.value.toString(),
        deleted: false,
        createdBy: this.customerId!, 
        createdOn: new Date(), 
        lastModifiedDate: new Date(), 
        lastModifiedBy: this.customerId! 
      };

      return wallpaper;
    });

    // Determine whether to add or update based on wallpaperId
    const wallpapersToAdd = wallpapers.filter(w => !w.wallpaperId);
    const wallpapersToUpdate = wallpapers.filter(w => w.wallpaperId);

    if (wallpapersToAdd.length > 0) {
      this.wallpaperProvider.addWallpaper(wallpapersToAdd);
    }

    if (wallpapersToUpdate.length > 0) {
      this.wallpaperProvider.updateWallpaper(wallpapersToUpdate);
    }
  }
  private calculatePrices(): void {
    let overallTotalPrice = 0; // Initialize overall total price

    this.wallpapers.controls.forEach((group) => {
        const productType = group.get('productType')?.value;
        const numRolls = group.get('noOfRolls')?.value || 0;
        const wallpaperRate = this.pricerates[productType] || 0;

        // Calculate individual wallpaper price
        const wallpaperPrice = numRolls * wallpaperRate;

        // Set individual price
        group.get('price')?.setValue(wallpaperPrice, { emitEvent: false });

        // Set section total for this specific wallpaper
        const sectionTotal = wallpaperPrice.toFixed(2);
        group.get('sectionTotal')?.setValue(sectionTotal, { emitEvent: false });

        // Add to overall total price
        overallTotalPrice += wallpaperPrice;
    });

    // Set the overall wallpaper total
    this.wallpaperForm.get('wallpaperTotal')?.setValue(overallTotalPrice.toFixed(2), { emitEvent: false });

    // Update row count
    this.updateRowCount();
}

  private updateRowCount(): void {
    const rowCount = this.wallpapers.length;
    this.wallpaperForm.get('totalRows')?.setValue(rowCount, { emitEvent: false });
  }

  removeWallpaper(index: number): void {
    this.wallpapers.removeAt(index);
    this.calculatePrices();
  }
}