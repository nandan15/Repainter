import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InternalPainting } from 'src/app/Shared/models/internalpainting';
import { InternalPaintinProvider } from 'src/app/Shared/Provider/InternalPaintinProvider';
@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {
  customerId: number | null = null;
  requirementForm!: FormGroup;
  @Input()currentInternalPainting:InternalPainting=new InternalPainting;
  wallTypes = [
    'PRIMER + 2 COATS BUDGET EMULSION',
    'PRIMER + 2 COATS PREMIUM EMULSION',
    'PRIMER + 2 COATS LUXURY EMULSION',
    'PRIMER + 2 COATS HEALTH SHIELD PAINT',
    'PRIMER + PUTTY + 2 COATS BUDGET EMULSION',
    'PRIMER + PUTTY + 2 COATS PREMIUM EMULSION',
    'PRIMER + PUTTY + 2 COATS LUXURY EMULSION',
  ];

  ceilingTypes = [
    '2 COATS BUDGET EMULSION',
    'PRIMER + 2 COATS BUDGET EMULSION',
    'PRIMER + 2 COATS PREMIUM EMULSION',
    'PRIMER + PUTTY + 2 COATS BUDGET EMULSION',
    'PRIMER + PUTTY + 2 COATS PREMIUM EMULSION',
  ];

  rates: { [key: string]: number } = {
    '2 COATS BUDGET EMULSION': 8.5,
    'PRIMER + 2 COATS BUDGET EMULSION': 11,
    'PRIMER + 2 COATS PREMIUM EMULSION': 18,
    'PRIMER + PUTTY + 2 COATS BUDGET EMULSION': 19,
    'PRIMER + PUTTY + 2 COATS PREMIUM EMULSION': 26,
  };

  pricerates: { [key: string]: number } = {
    'PRIMER + 2 COATS BUDGET EMULSION': 11,
    'PRIMER + 2 COATS PREMIUM EMULSION': 18,
    'PRIMER + 2 COATS LUXURY EMULSION': 23,
    'PRIMER + 2 COATS HEALTH SHIELD PAINT': 25,
    'PRIMER + PUTTY + 2 COATS BUDGET EMULSION': 19,
    'PRIMER + PUTTY + 2 COATS PREMIUM EMULSION': 26,
    'PRIMER + PUTTY + 2 COATS LUXURY EMULSION': 32,
  };

  constructor(
    private fb: FormBuilder,
    private internalPaintingProvider: InternalPaintinProvider,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }
  

  ngOnInit() {
    this.setupListeners();
    this.extractCustomerId();
    if (this.customerId) {
      this.fetchExistingInternalPaintingData();
    }
  }
  private fetchExistingInternalPaintingData() {
    if (this.customerId !== null) {
        // Fetch internal painting data with a condition for deleted = 0
        this.internalPaintingProvider.getInternalPaintingByCustomerId(this.customerId, { deleted: 0 }).subscribe(
            (internalPaintingData) => {
                if (internalPaintingData && internalPaintingData.length > 0) {
                    const latestInternalPainting = internalPaintingData[0];
                    
                    this.requirementForm.patchValue({
                        carpetArea: latestInternalPainting.carpetArea,
                        ceilingType: latestInternalPainting.ceilingType,
                        ceilingPrice: latestInternalPainting.ceilingPrice,
                        ceilingRemarks: latestInternalPainting.ceilingRemarsk,
                        wallType: latestInternalPainting.wallType,
                        wallPrice: latestInternalPainting.wallPrice,
                        wallRemarks: latestInternalPainting.wallRemarks,
                        noofWall: latestInternalPainting.noofWall,
                        darkPrice: latestInternalPainting.darkPrice,
                        darkRemarks: latestInternalPainting.darkRemarks,
                        sectionTotalPre_tax: latestInternalPainting.sectionTotalPre_tax,
                        sectionTotalPost_tax: latestInternalPainting.sectionTotalPost_tax,
                        totalRemarks: latestInternalPainting.totalRemarks
                    });
                }
            },
            (error) => {
                console.error('Error fetching internal painting data:', error);
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
    if (this.currentInternalPainting && this.currentInternalPainting.customerId) {
      this.customerId = this.currentInternalPainting.customerId;
      console.log('Current Internal Painting Customer ID:', this.customerId);
    }
  }
  private initializeForm() {
    this.requirementForm = this.fb.group({
      carpetArea: ['',Validators.required],
      ceilingType: ['',Validators.required],
      ceilingPrice: ['',Validators.required],
      ceilingRemarsk:['',Validators.required],
      wallType: ['',Validators.required],
      wallPrice: ['',Validators.required],
      wallRemarks:['',Validators.required],
      noofWall:['',Validators.required],
      darkPrice:['',Validators.required],
      darkRemarks:['',Validators.required],
      sectionTotalPre_tax: ['',Validators.required],
      sectionTotalPost_tax:['',Validators.required],
      totalRemarks:['',Validators.required]
    });
  }
  OnAddInternalPainting() {
    console.log('Current Customer ID:', this.customerId);
    if (!this.customerId) {
      const urlParts = window.location.pathname.split('/');
      const customerIdFromUrl = urlParts[urlParts.indexOf('view') + 1];
      this.customerId = customerIdFromUrl ? parseInt(customerIdFromUrl, 10) : null;
      console.log('URL Extracted Customer ID:', this.customerId);
    }
    if (!this.customerId) {
      console.error('Customer ID is required');
      return;
    }
    const internalPainting: InternalPainting = {
      customerId: this.customerId,
      carpetArea: this.requirementForm.get('carpetArea')?.value,
      ceilingType: this.requirementForm.get('ceilingType')?.value,
      ceilingPrice: this.requirementForm.get('ceilingPrice')?.value,
      ceilingRemarsk: this.requirementForm.get('ceilingRemarsk')?.value,
      wallType: this.requirementForm.get('wallType')?.value,
      wallPrice: this.requirementForm.get('wallPrice')?.value,
      wallRemarks: this.requirementForm.get('wallRemarks')?.value,
      noofWall: this.requirementForm.get('noofWall')?.value.toString(),
      darkPrice: this.requirementForm.get('darkPrice')?.value,
      darkRemarks: this.requirementForm.get('darkRemarks')?.value,
      sectionTotalPost_tax: this.requirementForm.get('sectionTotalPost_tax')?.value,
      sectionTotalPre_tax: this.requirementForm.get('sectionTotalPre_tax')?.value,
      totalRemarks: this.requirementForm.get('totalRemarks')?.value
    };
    if (this.currentInternalPainting.internalPaintingId) {
      this.internalPaintingProvider.updateInternalPainting(internalPainting);
    } else {
      this.internalPaintingProvider.addInternalPainting(internalPainting);
    }
  }
  private setupListeners() {
    // Listen for changes in carpet area
    this.requirementForm.get('carpetArea')?.valueChanges.subscribe(() => {
      this.calculatePrices();
    });

    // Listen for changes in wall type
    this.requirementForm.get('wallType')?.valueChanges.subscribe(() => {
      this.calculateWallPrice();
    });

    // Listen for changes in ceiling type
    this.requirementForm.get('ceilingType')?.valueChanges.subscribe(() => {
      this.calculateCeilingPrice();
    });
  }

  private calculatePrices() {
    this.calculateWallPrice();
    this.calculateCeilingPrice();
  }

  private calculateWallPrice() {
    const carpetArea = Number(this.requirementForm.get('carpetArea')?.value) || 0;
    const wallType = this.requirementForm.get('wallType')?.value;
    const wallRate = this.pricerates[wallType] || 0;

    const wallPrice = carpetArea * 2 * wallRate;
    
    this.requirementForm.patchValue({
      wallPrice: wallPrice.toFixed(2)
    }, { emitEvent: false });

    this.calculateSectionTotal();
  }

  private calculateCeilingPrice() {
    const carpetArea = Number(this.requirementForm.get('carpetArea')?.value) || 0;
    const ceilingType = this.requirementForm.get('ceilingType')?.value;
    const ceilingRate = this.rates[ceilingType] || 0;

    const ceilingPrice = carpetArea * ceilingRate;
    
    this.requirementForm.patchValue({
      ceilingPrice: ceilingPrice.toFixed(2)
    }, { emitEvent: false });

    this.calculateSectionTotal();
  }

  private calculateSectionTotal() {
    const wallPrice = Number(this.requirementForm.get('wallPrice')?.value) || 0;
    const ceilingPrice = Number(this.requirementForm.get('ceilingPrice')?.value) || 0;
    
    const total = wallPrice + ceilingPrice;
    
    this.requirementForm.patchValue({
      sectionTotalPost_tax: total.toFixed(2)
    }, { emitEvent: false });
  }
  

}