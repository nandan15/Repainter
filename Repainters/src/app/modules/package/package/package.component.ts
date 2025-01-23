import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Package } from 'src/app/Shared/models/package';
import { PackageProvider } from 'src/app/Shared/Provider/PackageProvider';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent implements OnInit {
  @Output() formModified = new EventEmitter<void>();
  PackageForm!: FormGroup;
 customerId: number | null = null;
  @Input() currentpackage: Package = new Package();
  packageTypes = ['Classic', 'Premium', 'Royale'];
  furnitureTypes = ['Tango', 'Trio', 'Quad'];
  readonly SPECIFICATIONS: { [key: string]: string } = {
    '001': `CEILING : 2 COATS OF BUDGET EMULSION
WALLS : PRIMER + 2 COATS PREMIUM EMULSION
RE-POLISHING : 1 MAIND OOR AND RE-PAINTING OF 1 BALCONY GRILL`,
    '002': `CEILING : 2 COATS OF BUDGET EMULSION
WALLS : PRIMER + 2 COATS PREMIUM EMULSION
1 WALL TEXTURE - CLASSIC RANGE`,
    '003': `CEILING : 2 COATS OF BUDGET EMULSION
WALLS : PRIMER + 2 COATS PREMIUM EMULSION`
  };

  readonly STANDARD_CONDITIONS = `Touchchup Putty + Two Coats Budget Range Emulsion. 
Brands : Asian - Tractor / JSW - Elegant/ Opus - I10
Touchup Putty + One Coat Primer + Two Coats Premium Emulsion. 
Brands : Asian - Premium Emulsion / JSW - Regal / Opus - I30.`;

  readonly PRODUCT_AMOUNTS: { [key: string]: number } = {
    'TAC2001': 51500,
    'TAC3001': 65800,
    'TAC4001': 76400,
    'TAC2002': 59200,
    'TAC3002': 73400,
    'TAC4002': 84100,
    'TAC2003': 51200,
    'TAC3003': 65400,
    'TAC4003': 76100
  };

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private packageProvider:PackageProvider) {}

  ngOnInit() {
    this.PackageForm = this.fb.group({
      package: this.fb.array([])
    });

    this.addPackage();
    this.extractCustomerId();

    this.PackageForm.valueChanges.subscribe(() => {
      this.formModified.emit();
    });
  }

  get package(): FormArray {
    return this.PackageForm.get('package') as FormArray;
  }
  private extractCustomerId() {
    this.route.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      if (customerIdParam) {
        this.customerId = parseInt(customerIdParam, 10);
      }
      console.log('Current Route Customer Id:', this.customerId);
      
      if (this.currentpackage && this.currentpackage.customerId) {
        this.customerId = this.currentpackage.customerId;
        console.log('Current Package Customer Id:', this.customerId);
      }
    });
  }
  createPackage(): FormGroup {
    const packageGroup = this.fb.group({
      packageType: ['', Validators.required],
      productCode: [''],
      type: ['', Validators.required],
      specification: [''],
      conditions: [''],
      amount: [''],
      remarks: [''],
      sectionTotalPretax: [''],
      sectionTotalPosttax: ['']
    });

    // Handle furniture type changes
    packageGroup.get('packageType')?.valueChanges.subscribe(packageType => {
      if (packageType) {
        const furniturePrefix = packageType.substring(0, 2).toUpperCase();
        const currentType = packageGroup.get('type')?.value;

        if (currentType) {
          const packageSuffix = currentType.substring(0, 1).toUpperCase();
          packageGroup.patchValue({
            productCode: `${furniturePrefix}${packageSuffix}`
          }, { emitEvent: false });
        } else {
          packageGroup.patchValue({
            productCode: furniturePrefix
          }, { emitEvent: false });
        }
      }
    });

    // Handle product code changes
    packageGroup.get('productCode')?.valueChanges.subscribe(productCode => {
      if (productCode && productCode.length >= 7) {  
        const amount = this.PRODUCT_AMOUNTS[productCode];
        if (amount) {
          const configCode = productCode.substring(4, 7); 
          const specification = this.SPECIFICATIONS[configCode];
          const pretaxAmount = amount;
          const posttaxAmount = pretaxAmount * 1.18; 

          packageGroup.patchValue({
            amount: amount.toString(),
            specification: specification || '',
            conditions: this.STANDARD_CONDITIONS,
            sectionTotalPretax: pretaxAmount.toString(),
            sectionTotalPosttax: posttaxAmount.toFixed(2)
          }, { emitEvent: false });
        }
      }
    });

    // Handle package type changes
    packageGroup.get('type')?.valueChanges.subscribe(packageType => {
      const furnitureType = packageGroup.get('packageType')?.value;
      if (packageType && packageType) {
        const furniturePrefix = packageType.substring(0, 2).toUpperCase();
        const packageSuffix = packageType.substring(0, 1).toUpperCase();
        packageGroup.patchValue({
          productCode: `${furniturePrefix}${packageSuffix}`
        }, { emitEvent: false });
      }
    });

    return packageGroup;
  }
  confirmPackage() {
    if (this.PackageForm.valid) {
      this.package.controls.forEach(packageControl => {
        const currentPackage = new Package();
        this.customerId = this.customerId;
        currentPackage.packageType = packageControl.get('packageType')?.value;
        currentPackage.productCode = packageControl.get('productCode')?.value;
        currentPackage.type = packageControl.get('type')?.value;
        currentPackage.amount = packageControl.get('amount')?.value;
        currentPackage.remarks = packageControl.get('remarks')?.value;
        currentPackage.specification = packageControl.get('specification')?.value;
        currentPackage.condition = packageControl.get('conditions')?.value;
        currentPackage.sectionTotalPreTax = packageControl.get('sectionTotalPretax')?.value;
        currentPackage.sectionTotalPostTax = packageControl.get('sectionTotalPosttax')?.value;
  
        if (currentPackage.packageId) {
          this.packageProvider.updatePackage(currentPackage);
        } else {
          this.packageProvider.addPackage([currentPackage]);
        }
      });
    } else {
      // Optionally, mark form as touched to show validation errors
      this.PackageForm.markAllAsTouched();
    }
  }
  addPackage() {
    const packageGroup = this.createPackage();
    this.package.push(packageGroup);
  }

  removePackage(index: number) {
    this.package.removeAt(index);
  }

  calculateSectionTotal(): string {
    const total = this.package.controls.reduce((total, control) => {
      const postTaxValue = parseFloat(control.get('sectionTotalPosttax')?.value || '0');
      return total + postTaxValue;
    }, 0);
    return total.toFixed(2);
  }
}