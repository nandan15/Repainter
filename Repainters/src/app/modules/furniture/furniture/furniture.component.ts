import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Furniture } from 'src/app/Shared/models/furniture';
import { FurnitureProvider } from 'src/app/Shared/Provider/FurnitureProvider';

interface ProductData {
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  customerId: number | null = null;
  furnitureForm!: FormGroup;
  @Input() currentFurniture: Furniture = new Furniture();
  
  readonly productDatabase: Readonly<{ [key: string]: ProductData }> = {
    'L001': {
      name: 'AUSTEN I',
      price: 29000,
      description: `Dimension: 4'(L) x 1'4"(D) x 2'10"(H)

      About: This piece is a wooden storage cabinet with a sleek, rectangular design. The standout feature is its double-door front, adorned with an intricate geometric lattice pattern in a traditional style, complemented by a white backing to emphasize the details. The cabinet is supported by sturdy, slightly raised wooden legs, adding stability and a touch of modern minimalism. It features small, circular metal handles for easy access to the storage space inside. This cabinet is both decorative and functional, making it ideal for enhancing the aesthetic of any living or dining area.`
    },
    'L002': {
      name: 'AUSTEN II',
      price: 39000,
      description: `Dimension: 6'(L) x 1'4"(D) x 2'10"(H)

      About: This piece is a wooden storage cabinet with a sleek, rectangular design. The standout feature is its double-door front, adorned with an intricate geometric lattice pattern in a traditional style, complemented by a white backing to emphasize the details. The cabinet is supported by sturdy, slightly raised wooden legs, adding stability and a touch of modern minimalism. It features small, circular metal handles for easy access to the storage space inside. This cabinet is both decorative and functional, making it ideal for enhancing the aesthetic of any living or dining area.`
    },
    'L003': {
      name: 'AUSTEN III',
      price: 45000,
      description: `Dimension: 5'4"(L) x 1'4"(D) x 2'(H)

      About: This elegant media console blends intricate geometric inlay work with a natural wood finish, exuding timeless charm. Its spacious design features two cabinets, open shelving, and drawers, perfect for organizing and elevating living rooms or entertainment spaces.`
    }
  } as const;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private furnitureProvider: FurnitureProvider,private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.extractCustomerId();
    this.furniture.push(this.createFurniture());
    
    if (this.customerId) {
      this.fetchExistingFurnitureData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.furnitureForm = this.fb.group({
      furniture: this.fb.array([]),
      sectionTotal: [0]
    });
  }

  private fetchExistingFurnitureData(): void {
    if (this.customerId === null) return;

    this.furnitureProvider.getFurnitureByCustomerId(this.customerId, { deleted: 0 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (furnitureData: Furniture[]) => {
          if (!furnitureData?.length) return;
          
          const furnitureArray = this.furnitureForm.get('furniture') as FormArray;
          furnitureArray.clear();

          furnitureData.forEach((furniture) => {
            furnitureArray.push(this.createFurnitureGroup(furniture));
          });

          this.updateSectionTotal();
        },
        error: (error) => {
          console.error('Error fetching furniture data:', error);
        }
      });
  }

  private createFurnitureGroup(furniture: Furniture): FormGroup {
    return this.fb.group({
      productCode: [furniture.productCode, Validators.required],
      name: [{ value: furniture.name, disabled: true }, Validators.required],
      price: [{ value: furniture.price, disabled: true }, Validators.required],
      description: [{ value: furniture.description, disabled: true }],
      remarks: [furniture.remarks, Validators.required],
    });
  }

  private extractCustomerId(): void {
    // Handle parent route params
    if (this.route.parent) {  // Check if parent route exists
      this.route.parent.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe(params => {
          const customerIdParam = params.get('customerId');
          if (customerIdParam) {
            this.customerId = parseInt(customerIdParam, 10);
            console.log('Parent Route Customer ID:', this.customerId);
          }
        });
    }

    // Handle current route params
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const customerIdParam = params.get('customerId');
        if (customerIdParam) {
          this.customerId = parseInt(customerIdParam, 10);
          console.log('Current Route Customer ID:', this.customerId);
        }
      });

    // Handle currentFurniture input
    if (this.currentFurniture?.customerId) {
      this.customerId = this.currentFurniture.customerId;
      console.log('Current Furniture Customer ID:', this.customerId);
    }
  }
  get furniture(): FormArray {
    return this.furnitureForm.get('furniture') as FormArray;
  }

  createFurniture(): FormGroup {
    return this.fb.group({
      productCode: ['', Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      price: [{ value: '', disabled: true }, Validators.required],
      description: [{ value: '', disabled: true }],
      remarks: ['', Validators.required]
    });
  }

  addFurniture(): void {
    if (this.furnitureForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    const userId = localStorage.getItem('UserId');
    if (!userId) {
        console.error('User ID not found in localStorage');
        this.toaster.error('User ID not found. Please try logging in again.');
        return;
    }
    if (!this.customerId) {
      const urlParts = window.location.pathname.split('/');
      const customerIdFromUrl = urlParts[urlParts.indexOf('view') + 1];
      this.customerId = customerIdFromUrl ? parseInt(customerIdFromUrl, 10) : null;
      
      if (!this.customerId) {
        console.error('Customer ID is required');
        return;
      }
    }

    const furnitureArray = this.furnitureForm.get('furniture') as FormArray;
    const furnitureOperations = furnitureArray.controls.map((control) => {
      const furniture: Furniture = {
        customerId: this.customerId!,
        productCode: control.get('productCode')?.value,
        name: control.get('name')?.value,
        price: control.get('price')?.value,
        description: control.get('description')?.value,
        remarks: control.get('remarks')?.value,
        sectionTotal: this.furnitureForm.get('sectionTotal')?.value,
        deleted: false,
        createdBy:parseInt(userId),
        lastModifiedBy:parseInt(userId),
        lastModifiedOn:new Date(),
        createdOn:new Date(),
      };

      return this.currentFurniture.furnitureId
        ? this.furnitureProvider.updateFurniture(furniture)
        : this.furnitureProvider.addFurniture(furniture);
    });

    if (furnitureOperations.length > 0) {
      forkJoin(furnitureOperations)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.fetchExistingFurnitureData();
          },
          error: (error: any) => {
            console.error('Error processing furniture:', error);
          }
        });
    }
  }

  removeFurniture(index: number): void {
    this.furniture.removeAt(index);
    this.updateSectionTotal();
  }

  updateFurnitureDetails(index: number, code: string): void {
    const furnitureGroup = this.furniture.at(index);
    const product = this.productDatabase[code];

    if (product) {
      furnitureGroup.patchValue({
        name: product.name,
        price: product.price,
        description: product.description
      });
    } else {
      furnitureGroup.patchValue({
        name: '',
        price: '',
        description: ''
      });
    }

    this.updateSectionTotal();
  }

  updateSectionTotal(): void {
    const total = this.calculateSectionTotal();
    this.furnitureForm.get('sectionTotal')?.setValue(total);
  }

  formatDescription(description: string): string[] {
    return description?.split('\n\n') ?? [];
  }

  calculateSectionTotal(): number {
    return this.furniture.controls.reduce((total, control) => {
      return total + (control.get('price')?.value || 0);
    }, 0);
  }
}