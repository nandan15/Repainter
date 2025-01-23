import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Wallpaper } from 'src/app/Shared/models/wallpaper';
import { WallpaperProvider } from 'src/app/Shared/Provider/WallpaperProvider';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.css']
})
export class WallpaperComponent {
  wallpaperForm: FormGroup;
  @Input()currentWallpaper:Wallpaper=new Wallpaper;
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
    this.addNewWallpaper();
  }

  ngOnInit(): void {
    this.setupListeners();
    this.extractCustomerId();
  }
  private extractCustomerId() {
    // Extract customer ID from route
    this.route.parent?.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      this.customerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
      console.log('Parent Route Customer ID:', this.customerId);
    });
    this.route.paramMap.subscribe(params=>{
      const customerIdParam=params.get('customerId');
      if(customerIdParam){
        this.customerId=parseInt(customerIdParam,10);
        console.log('Current Route Customer Id:',this.customerId);
      }
    });
    if(this.currentWallpaper && this.currentWallpaper.customerId)
    {
      this.customerId=this.currentWallpaper.customerId;
      console.log('Current Wallpaper Customer Id:',this.customerId);
    }
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
  onConfirmWallpaper() {
    if (!this.customerId) {
      console.error('Customer ID is required');
      return;
    }
    const wallpapers = this.wallpapers.controls.map((group, index) => {
      return {
        customerId: this.customerId,
        productType: group.get('productType')?.value,
        productCode: group.get('productCode')?.value,
        noOfRolls: group.get('noOfRolls')?.value,
        price: group.get('price')?.value,
        remarks: group.get('remarks')?.value,
        sectionTotal: this.wallpaperForm.get('sectionTotal')?.value.toString()
      } as Wallpaper;
    });
    this.wallpaperProvider.addWallpaper(wallpapers);
  }
  addNewWallpaper(): void {
    const wallpaperGroup = this.fb.group({
      productType: ['', Validators.required],
      productCode: ['', Validators.required],
      noOfRolls: [0, [Validators.required, Validators.min(1), this.rollsLimitValidator.bind(this)]],
      price: [0, Validators.required],
      remarks:['',Validators.required],
      sectionTotal:['',Validators.required]
    });

    this.wallpapers.push(wallpaperGroup);

    wallpaperGroup.valueChanges.subscribe(() => {
      this.calculatePrices();
    });

    this.updateRowCount();
  }

  private setupListeners(): void {
    this.wallpaperForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  private calculatePrices(): void {
    this.wallpapers.controls.forEach((group) => {
      const productType = group.get('productType')?.value;
      const numRolls = group.get('noOfRolls')?.value;
      const wallpaperRate = this.pricerates[productType] || 0;

      const wallpaperPrice = (numRolls || 0) * wallpaperRate;
      group.get('price')?.setValue(wallpaperPrice, { emitEvent: false });
    });

    this.calculateTotal();
  }

  private calculateTotal(): void {
    const total = this.wallpapers.controls.reduce((sum, group) => {
      const wallpaperPrice = group.get('price')?.value || 0;
      return sum + Number(wallpaperPrice);
    }, 0);

    this.wallpaperForm.get('sectionTotal')?.setValue(total, { emitEvent: false });
    this.updateRowCount();
  }

  private updateRowCount(): void {
    const rowCount = this.wallpapers.length;
    this.wallpaperForm.get('totalRows')?.setValue(rowCount, { emitEvent: false });
  }

  removeWallpaper(index: number): void {
    this.wallpapers.removeAt(index);
    this.calculateTotal();
  }
}
