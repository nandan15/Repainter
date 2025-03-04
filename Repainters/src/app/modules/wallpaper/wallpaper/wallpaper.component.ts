import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Wallpaper } from 'src/app/Shared/models/wallpaper';
import { WallpaperProvider } from 'src/app/Shared/Provider/WallpaperProvider';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

interface WallpaperForm {
  productType: FormControl<string | null>;
  productCode: FormControl<string | null>;
  noOfRolls: FormControl<number | null>;
  price: FormControl<number | null>;
  remarks: FormControl<string | null>;
  isNew: FormControl<boolean>;
  wallpaperId: FormControl<number | null>;
}

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.css'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WallpaperComponent implements OnInit {
  wallpaperForm: FormGroup;
  customerId: number | null = null;
  @Input() currentWallpaper: Wallpaper = new Wallpaper();
  productTypes = ['Classic', 'Premium', 'Azzure', 'Custom'];
  pricerates: { [key: string]: number } = {
    'Classic': 7500,
    'Premium': 15000,
    'Azzure': 25000,
    'Custom': 35000
  };

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private wallpaperProvider: WallpaperProvider,
    private toastr: ToastrService
  ) {
    this.wallpaperForm = this.fb.group({
      wallpapers: this.fb.array([]),
      sectionTotal: new FormControl<number>(0),
      totalRows: new FormControl<number>(0)
    });
  }

  ngOnInit() {
    this.extractCustomerId();
    if (this.customerId) {
      this.fetchWallpaperData();
    } else {
      this.addNewWallpaper();
    }
  }

  private fetchWallpaperData() {
    if (this.customerId !== null) {
      console.log('Fetching wallpaper data for customer:', this.customerId);
      this.isLoading = true;
      
      this.wallpaperProvider.getWallpaperByCustomerId(this.customerId, { deleted: 0 })
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          })
        )
        .subscribe({
          next: (wallpaperData) => {
            if (wallpaperData && wallpaperData.length > 0) {
              this.wallpapers.clear();
              
              wallpaperData.forEach(wallpaper => {
                const wallpaperGroup = this.createWallpaperFormGroup();
                
                wallpaperGroup.patchValue({
                  wallpaperId: wallpaper.wallpaperId,
                  productType: wallpaper.productType,
                  productCode: wallpaper.productCode,
                  noOfRolls: wallpaper.noOfRolls,
                  price: wallpaper.price,
                  remarks: wallpaper.remarks,
                  isNew: false
                }, { emitEvent: false });
                
                this.wallpapers.push(wallpaperGroup);
              });
              
              this.updateSectionTotal();
            } else {
              this.addNewWallpaper();
            }
          },
          error: (error: Error) => {
            console.error('Error in component while fetching wallpaper data:', error);
            this.toastr.error('Error loading existing wallpaper data');
          }
        });
    }
  }

  private extractCustomerId() {
    this.route.parent?.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      this.customerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
      if (this.customerId) {
        this.fetchWallpaperData(); // Fetch data when customerId changes
      }
      console.log('Parent Route Customer ID:', this.customerId);
    });
    this.route.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      if (customerIdParam) {
        this.customerId = parseInt(customerIdParam, 10);
        console.log('Current Route Customer ID:', this.customerId);
      }
    });
    if (this.currentWallpaper && this.currentWallpaper.customerId) {
      this.customerId = this.currentWallpaper.customerId;
      this.fetchWallpaperData(); // Fetch data when currentWallpaper changes
    }
  }
  get wallpapers(): FormArray {
    return this.wallpaperForm.get('wallpapers') as FormArray;
  }
  getWallpaperGroup(index: number): FormGroup {
    return this.wallpapers.at(index) as FormGroup;
  }

  private createWallpaperFormGroup(): FormGroup<WallpaperForm> {
    const wallpaperGroup = this.fb.group<WallpaperForm>({
      wallpaperId: new FormControl<number | null>(null),
      productType: new FormControl<string | null>(null, Validators.required),
      productCode: new FormControl<string | null>(null, Validators.required),
      noOfRolls: new FormControl<number | null>(1, [Validators.required, Validators.min(1), Validators.max(20)]),
      price: new FormControl<number | null>(0),
      remarks: new FormControl<string | null>(''),
      isNew: new FormControl<boolean>(true, { nonNullable: true })
    });

    wallpaperGroup.get('productType')?.valueChanges.subscribe(() => this.updatePrice(wallpaperGroup));
    wallpaperGroup.get('noOfRolls')?.valueChanges.subscribe(() => this.updatePrice(wallpaperGroup));

    return wallpaperGroup;
  }
  private updatePrice(wallpaper: FormGroup<WallpaperForm>) {
    const noOfRolls = Number(wallpaper.get('noOfRolls')?.value) || 0;
    const productType = wallpaper.get('productType')?.value;

    if (noOfRolls > 0 && productType && this.pricerates[productType]) {
      const price = noOfRolls * this.pricerates[productType];
      wallpaper.patchValue({ price }, { emitEvent: false });
      this.updateSectionTotal();
    }
  }

  private updateSectionTotal() {
    const total = this.wallpapers.controls.reduce((sum, control) => {
      const wallpaper = control as FormGroup<WallpaperForm>;
      return sum + (Number(wallpaper.get('price')?.value) || 0);
    }, 0);

    this.wallpaperForm.patchValue({
      sectionTotal: total
    }, { emitEvent: false });

    this.cdRef.detectChanges();
  }

  onConfirmWallpaper() {
    if (!this.customerId) {
      this.toastr.error('Customer ID is required');
      return;
    }

    const userId = localStorage.getItem('UserId');
    if (!userId) {
      this.toastr.error('User ID not found. Please try logging in again.');
      return;
    }

    // Filter only new entries
    const newWallpapers = this.wallpapers.controls
      .filter(control => control.get('isNew')?.value === true)
      .map(group => ({
        customerId: this.customerId,
        productType: group.get('productType')?.value,
        productCode: group.get('productCode')?.value,
        noOfRolls: group.get('noOfRolls')?.value,
        price: group.get('price')?.value,
        remarks: group.get('remarks')?.value,
        sectionTotal: this.wallpaperForm.get('sectionTotal')?.value?.toString(),
        createdBy: parseInt(userId),
        lastModifiedBy: parseInt(userId)
      } as Wallpaper));

    if (newWallpapers.length === 0) {
      this.toastr.info('No new wallpapers to save');
      return;
    }

    this.isLoading = true;
    this.wallpaperProvider.addWallpaper(newWallpapers)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      }))
      .subscribe({
        next: () => {
          // Re-fetch all data after successful save
          this.fetchWallpaperData();
        },
        error: (error) => {
          this.toastr.error('Error saving wallpaper data');
          console.error('Error:', error);
        }
      });
  }


  addNewWallpaper() {
    const newWallpaper = this.createWallpaperFormGroup();
    this.wallpapers.push(newWallpaper);
    this.updateTotalRows();
  }

  removeWallpaper(index: number) {
    const wallGroup = this.wallpapers.at(index);
    const wallpaperId = wallGroup.get('wallpaperId')?.value; 
    if (wallpaperId) {
      this.isLoading = true;
      const wallpaper = new Wallpaper();
      wallpaper.wallpaperId = wallpaperId;
      this.wallpaperProvider.deleteWallpaper(wallpaper)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          })
        )
        .subscribe({
          next: () => {
            this.wallpapers.removeAt(index);
            this.updateSectionTotal();
            this.updateTotalRows();
          },
          error: (error) => {
            console.error('Error deleting wallpaper:', error);
            this.toastr.error('Failed to delete wallpaper');
          }
        });
    } else {
      this.wallpapers.removeAt(index);
      this.updateSectionTotal();
      this.updateTotalRows();
    }
  }

  private updateTotalRows() {
    this.wallpaperForm.patchValue({
      totalRows: this.wallpapers.length
    }, { emitEvent: false });
  }
}