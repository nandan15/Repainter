import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { TexturePainting } from 'src/app/Shared/models/texturepainting';
import { TexturePaintingProvider } from 'src/app/Shared/Provider/TexturePaintingProvider';
import { ToastrService } from 'ngx-toastr';

interface WallForm {
  texturePaintingId:FormControl<number | null>;
  area: FormControl<number | null>;
  type: FormControl<string | null>;
  productCode: FormControl<string | null>;
  price: FormControl<number | null>;
  remarks: FormControl<string | null>;
  isNew: FormControl<boolean>; // Add this to track new entries
}

@Component({
  selector: 'app-texture-painting',
  templateUrl: './texture-painting.component.html',
  styleUrls: ['./texture-painting.component.css'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class TexturePaintingComponent implements OnInit {
  textureForm: FormGroup;
  customerId: number | null = null;
  @Input() currenttexturepainting: TexturePainting = new TexturePainting();
  texturetype = ['Classic', 'Premium', 'Azzure', 'Custom'];
  pricerates: { [key: string]: number } = {
    'Classic': 250,
    'Premium': 500,
    'Azzure': 700,
    'Custom': 2500
  };
  productCodes: { [key: string]: string[] } = {
    'Classic': ['TX001', 'TX002', 'TX003', 'TX007', 'TX008', 'TX009', 'TX010', 'TX011', 'TX012', 'TX027', 'TX028', 'TX029', 'TX032', 'TX033', 'TX034', 'TX038', 'TX039', 'TX040', 'TX041', 'TX042', 'TX043', 'TX044'],
    'Premium': ['TX004', 'TX005', 'TX006', 'TX021', 'TX022', 'TX023', 'TX024', 'TX025', 'TX026', 'TX030', 'TX031'],
    'Azzure': ['TX013', 'TX014', 'TX015', 'TX016', 'TX017', 'TX018', 'TX019', 'TX020', 'TX035', 'TX036', 'TX037'],
    'Custom': ['TX999']
  };

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private texturePaintingProvider: TexturePaintingProvider,
    private toastr: ToastrService
  ) {
    this.textureForm = this.fb.group({
      texturePaintings: this.fb.array([]),
      sectionTotal: new FormControl<number>(0),
      totalRows: new FormControl<number>(0)
    });
  }

  ngOnInit() {
    this.extractCustomerId();
    if (this.customerId) {
      this.fetchTexturePaintingData();
    } else {
      this.addNewWall(); // Add first wall if no existing data
    }
  }

  private fetchTexturePaintingData() {
    if (this.customerId !== null) {
        this.texturePaintingProvider.getTexturePaintingByCustomerId(this.customerId, { delete: 0 }).subscribe(
            (texturePaintingData) => {
                if (texturePaintingData && texturePaintingData.length > 0) {
                    this.texturePaintings.clear();
                    texturePaintingData.forEach(texturePainting => {
                        const wallGroup = this.createWallFormGroup();
                        wallGroup.patchValue({
                            texturePaintingId: texturePainting.texturePaintingId, // Add this line
                            area: Number(texturePainting.area),
                            type: texturePainting.type,
                            productCode: texturePainting.productCode,
                            price: texturePainting.price,
                            remarks: texturePainting.remarks,
                            isNew: false
                        });
                        this.texturePaintings.push(wallGroup);
                    });
                    this.updateSectionTotal();
                } else {
                    this.addNewWall();
                }
            },
            (error: Error) => {
                console.error('Error fetching texturing painting data:', error);
                this.toastr.error('Error loading existing texture painting data');
            }
        );
    }
}

  private extractCustomerId() {
    this.route.parent?.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      this.customerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
      console.log('Parent Route Customer ID:', this.customerId);
    });
    this.route.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      if (customerIdParam) {
        this.customerId = parseInt(customerIdParam, 10);
        console.log('Current Route Customer ID:', this.customerId);
      }
    });
    if (this.currenttexturepainting && this.currenttexturepainting.customerId) {
      this.customerId = this.currenttexturepainting.customerId;
      console.log('Current Texture Painting Customer ID:', this.customerId);
    }
  }

  get texturePaintings(): FormArray {
    return this.textureForm.get('texturePaintings') as FormArray;
  }

  getWallFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getSectionTotalControl(): FormControl<number> {
    return this.textureForm.get('sectionTotal') as FormControl<number>;
  }

  private createWallFormGroup(): FormGroup<WallForm> {
    const wallGroup = this.fb.group<WallForm>({
      texturePaintingId: new FormControl<number | null>(null), 
      area: new FormControl<number | null>(100, [Validators.required, Validators.min(100)]),
      type: new FormControl<string | null>(null),
      productCode: new FormControl<string | null>(null),
      price: new FormControl<number | null>(0),
      remarks: new FormControl<string | null>(''),
      isNew: new FormControl<boolean>(true, { nonNullable: true }) // Make it non-nullable
    });

    wallGroup.get('type')?.valueChanges.subscribe((type) => {
      const productCodeControl = wallGroup.get('productCode');
      if (type && this.productCodes[type]) {
        productCodeControl?.enable();
      } else {
        productCodeControl?.disable();
      }
    });

    return wallGroup;
  }
  private updatePrice(wall: FormGroup<WallForm>) {
    const area = Number(wall.get('area')?.value) || 0;
    const type = wall.get('type')?.value;

    if (area >= 100 && type && this.pricerates[type]) {
      const price = area * this.pricerates[type];
      wall.patchValue({ price }, { emitEvent: false });
      this.updateSectionTotal();
    }
  }

  private updateSectionTotal() {
    const total = this.texturePaintings.controls.reduce((sum, control) => {
      const wall = control as FormGroup<WallForm>;
      return sum + (Number(wall.get('price')?.value) || 0);
    }, 0);

    this.textureForm.patchValue({
      sectionTotal: total
    }, { emitEvent: false });

    this.cdRef.detectChanges();
  }

  onConfirmTexturePainting() {
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
    const newTexturePaintings = this.texturePaintings.controls
      .filter(control => control.get('isNew')?.value === true)
      .map(group => ({
        customerId: this.customerId,
        area: group.get('area')?.value.toString(),
        type: group.get('type')?.value,
        productCode: group.get('productCode')?.value,
        price: group.get('price')?.value,
        remarks: group.get('remarks')?.value,
        sectionTotal: this.textureForm.get('sectionTotal')?.value.toString(),
        createdBy: parseInt(userId),
        lastModifiedBy: parseInt(userId)
      } as TexturePainting));

    if (newTexturePaintings.length === 0) {
      this.toastr.info('No new texture paintings to save');
      return;
    }

    // Call the provider's method and handle the response
    this.texturePaintingProvider.addTexturePainting(newTexturePaintings);
    
    // Mark saved entries as not new
    this.texturePaintings.controls
      .filter(control => control.get('isNew')?.value === true)
      .forEach(control => control.get('isNew')?.setValue(false));
  }

  addNewWall() {
    const newWall = this.createWallFormGroup();

    newWall.get('area')?.valueChanges.subscribe(() => this.updatePrice(newWall));
    newWall.get('type')?.valueChanges.subscribe(() => this.updatePrice(newWall));

    this.texturePaintings.push(newWall);
    this.updateTotalRows();
  }

  removeWall(index: number) {
    const wall = this.texturePaintings.at(index);
    const texturePaintingId = wall.get('texturePaintingId')?.value;

    if (texturePaintingId) {
        // If the wall exists in the database
        const texturePainting = new TexturePainting();
        texturePainting.texturePaintingId = texturePaintingId;
        
        this.texturePaintingProvider.deleteTexturePainting(texturePainting).subscribe(
            () => {
                this.texturePaintings.removeAt(index);
                this.updateSectionTotal();
                this.updateTotalRows();
            },
            (error) => {
                console.error('Error deleting texture painting:', error);
            }
        );
    } else {
        // If it's a new wall that hasn't been saved
        this.texturePaintings.removeAt(index);
        this.updateSectionTotal();
        this.updateTotalRows();
    }
}
  private updateTotalRows() {
    // Update total rows in the form
    this.textureForm.patchValue({
      totalRows: this.texturePaintings.length
    }, { emitEvent: false });
  }

  isWallAreaValid(wall: AbstractControl): boolean {
    const wallGroup = wall as FormGroup;
    const areaControl = wallGroup.get('area');
    return areaControl ? !areaControl.errors : false;
  }

  // Method to get product codes based on the selected type
  getProductCodes(type: string | null): string[] {
    return type ? this.productCodes[type] : [];
  }
}