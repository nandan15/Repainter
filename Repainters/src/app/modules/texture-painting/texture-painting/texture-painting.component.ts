import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { TexturePainting } from 'src/app/Shared/models/texturepainting';
import { TexturePaintingProvider } from 'src/app/Shared/Provider/TexturePaintingProvider';

interface WallForm {
  area: FormControl<number | null>;
  type: FormControl<string | null>;
  productCode: FormControl<string | null>;
  price: FormControl<number | null>;
  remarks: FormControl<string | null>;
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
  texturetype = ['Budget', 'Premium', 'Luxury', 'Custom'];
  pricerates: { [key: string]: number } = {
    'Budget': 250,
    'Premium': 500,
    'Luxury': 700,
    'Custom': 2500
  };

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private texturePaintingProvider: TexturePaintingProvider
  ) {
    this.textureForm = this.fb.group({
      texturePaintings: this.fb.array([]),
      sectionTotal: new FormControl<number>(0),
      totalRows: new FormControl<number>(0)
    });
  }

  ngOnInit() {
    this.addNewWall();
    this.extractCustomerId();
    if (this.customerId) {
      this.fetchTexturePaintingData();
    }
  }

  private fetchTexturePaintingData() {
    if (this.customerId !== null) {
      this.texturePaintingProvider.getTexturePaintingByCustomerId(this.customerId, { delete: 0 }).subscribe(
        (texturePaintingData) => {
          if (texturePaintingData && texturePaintingData.length > 0) {
            // Clear existing walls before adding new ones
            this.texturePaintings.clear();
            texturePaintingData.forEach(texturePainting => {
              const wallGroup = this.createWallFormGroup();
              wallGroup.patchValue({
                area: Number(texturePainting.area), // Convert string to number here
                type: texturePainting.type,
                productCode: texturePainting.productCode,
                price: texturePainting.price,
                remarks: texturePainting.remarks
              });
              this.texturePaintings.push(wallGroup);
            });
            this.updateSectionTotal();
          }
        },
        (error) => {
          console.error('Error fetching texturing painting data:', error);
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
    return this.fb.group<WallForm>({
      area: new FormControl<number | null>(100, [Validators.required, Validators.min(100)]),
      type: new FormControl<string | null>(null),
      productCode: new FormControl<string | null>(null),
      price: new FormControl<number | null>(0),
      remarks: new FormControl<string | null>('')
    });
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
      console.error('Customer Id is required');
      return;
    }
  
    // Find the last (newly added) wall in the form array
    const lastAddedWall = this.texturePaintings.controls[this.texturePaintings.length - 1];
  
    // Only save the last added wall
    const texturePaintings = this.texturePaintings.controls.map(group => ({
      customerId: this.customerId,
      area: group.get('area')?.value.toString(), // Convert area to string
      type: group.get('type')?.value,
      productCode: group.get('productCode')?.value,
      price: group.get('price')?.value,
      remarks: group.get('remarks')?.value,
      sectionTotal: this.textureForm.get('sectionTotal')?.value.toString()
  } as TexturePainting));

  this.texturePaintingProvider.addTexturePainting(texturePaintings);
}
  addNewWall() {
    const newWall = this.createWallFormGroup();

    newWall.get('area')?.valueChanges.subscribe(() => this.updatePrice(newWall));
    newWall.get('type')?.valueChanges.subscribe(() => this.updatePrice(newWall));

    this.texturePaintings.push(newWall);
    this.updateTotalRows();
  }

  removeWall(index: number) {
    this.texturePaintings.removeAt(index);
    this.updateSectionTotal();
    this.updateTotalRows();
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
}
