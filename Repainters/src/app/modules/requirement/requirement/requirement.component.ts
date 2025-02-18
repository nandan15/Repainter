import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InternalPainting } from 'src/app/Shared/models/internalpainting';
import { InternalPaintinProvider } from 'src/app/Shared/Provider/InternalPaintinProvider';
import { QuotationService } from 'src/app/Shared/Service/quotation.service';
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
    'PRIMER + 2 COATS BUDGET EMULSION','PRIMER + 2 COATS PREMIUM EMULSION','PRIMER + 2 COATS LUXURY EMULSION',
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
  productCodeToColorMap: { [key: string]: string } = {
    '870': 'ORANGE',
    '257': 'ORANGE',
    '629': 'ORANGE',
    '224': 'ORANGE',
    '374': 'PINK',
    '295': 'ORANGE',
    '371': 'ORANGE',
    '561': 'PINK',
    '112': 'YELLOW',
    '584': 'YELLOW',
    '471': 'YELLOW',
    '440': 'YELLOW',
    '523': 'YELLOW',
    '494': 'RED',
    '888': 'PURPLE',
    '464': 'PURPLE',
    '342': 'PURPLE',
    '304': 'GREEN',
    '222': 'RED',
    '748': 'GREEN',
    '292': 'PINK',
    '534': 'PINK',
    '397': 'PINK',
    '499': 'PINK',
    '977': 'PURPLE',
    '804': 'PINK',
    '195': 'PURPLE',
    '701': 'PURPLE',
    '338': 'PURPLE',
    '132': 'PURPLE',
    '308': 'WHITE',
    '507': 'PURPLE',
    '400': 'PURPLE',
    '201': 'GREEN',
    '300': 'GREEN',
    '908': 'GREY',
    '971': 'BROWN',
    '546': 'BEIGE',
    '450': 'GREEN',
    '276': 'BEIGE',
    '786': 'BEIGE',
    '446': 'WHITE',
    '568': 'WHITE',
    '549': 'WHITE',
    '825': 'WHITE',
    '454': 'WHITE',
    '608': 'WHITE',
    '415': 'GREEN',
    '352': 'WHITE',
    '671': 'GREEN',
    '581': 'PINK',
    '176': 'PURPLE',
    '187': 'BLUE',
    '621': 'PURPLE',
    '768': 'BLUE',
    '396': 'BLUE',
    '459': 'PURPLE',
    '178': 'PURPLE',
    '311': 'BLUE',
    '289': 'BLUE',
    '358': 'BLUE',
    '181': 'BLUE',
    '286': 'GREEN',
    '899': 'GREEN',
    '551': 'BROWN',
    '151': 'GREEN',
    '703': 'GREEN',
    '324': 'BEIGE',
    '838': 'BROWN',
    '199': 'GREEN',
    '979': 'GREEN',
    '305': 'GREEN',
    '384': 'GREEN',
    '405': 'RED',
    '483': 'RED',
    '605': 'RED',
    '368': 'GREEN',
    '649': 'RED',
    '122': 'RED',
    '593': 'BROWN',
    '756': 'BROWN',
    '953': 'BROWN',
    '791': 'GREEN',
    '245': 'BROWN',
    '480': 'BEIGE',
    '622': 'BROWN',
    '669': 'BEIGE',
    '991': 'GREY',
    '489': 'GREY',
    '592': 'BROWN',
    '395': 'GREY',
    '653': 'GREY',
    '451': 'BEIGE',
    '674': 'BLUE',
    '277': 'GREY',
    'M001':'Metallic',
    'M002':'Metallic',
    'M003':'Metallic',
    'M004':'Metallic',
    'M005':'Metallic',
    'M006':'Metallic',
  };
  constructor(
    private fb: FormBuilder,
    private internalPaintingProvider: InternalPaintinProvider,
    private route: ActivatedRoute, private quotationService: QuotationService,private toaster:ToastrService
  ) {
    this.initializeForm();
  }
  ngOnInit() {
    this.setupListeners();
    this.extractCustomerId();
    if (this.customerId) {
      this.fetchExistingInternalPaintingData();
    }
    this.requirementForm.get('productCode')?.valueChanges.subscribe((productCode) => {
      this.updateColorField(productCode);
    });
  }
  private updateColorField(productCode: string) {
    const color = this.productCodeToColorMap[productCode] || '';
    this.requirementForm.patchValue({
      color: color
    }, { emitEvent: false });
  }
  private fetchExistingInternalPaintingData() {
    if (this.customerId !== null) {
        this.internalPaintingProvider.getInternalPaintingByCustomerId(this.customerId, { deleted: 0 }).subscribe(
            (internalPaintingData) => {
                if (internalPaintingData && internalPaintingData.length > 0) {
                    const latestInternalPainting = internalPaintingData[0];
                    this.requirementForm.patchValue({
                        carpetArea: latestInternalPainting.carpetArea,
                        productCode:latestInternalPainting.productCode,
                        color:latestInternalPainting.color,
                        ceilingType: latestInternalPainting.ceilingType,
                        ceilingPrice: latestInternalPainting.ceilingPrice,
                        ceilingRemarsk: latestInternalPainting.ceilingRemarsk,
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
      carpetArea: ['', Validators.required],
      productCode: ['', Validators.required], 
      color: ['', Validators.required], 
      ceilingType: ['', Validators.required],
      ceilingPrice: ['', Validators.required],
      ceilingRemarsk: ['', Validators.required],
      wallType: ['', Validators.required],
      wallPrice: ['', Validators.required],
      wallRemarks: ['', Validators.required],
      noofWall: ['', Validators.required],
      darkPrice: ['', Validators.required],
      darkRemarks: ['', Validators.required],
      sectionTotalPre_tax: ['', Validators.required],
      sectionTotalPost_tax: ['', Validators.required],
      totalRemarks: ['', Validators.required]
    });
  }
  OnAddInternalPainting() {
    if (!this.customerId) {
        const urlParts = window.location.pathname.split('/');
        const customerIdFromUrl = urlParts[urlParts.indexOf('view') + 1];
        this.customerId = customerIdFromUrl ? parseInt(customerIdFromUrl, 10) : null;
    }
    if (!this.customerId) {
        console.error('Customer ID is required');
        return;
    }
    const userId = localStorage.getItem('UserId');
    if (!userId) {
        console.error('User ID not found in localStorage');
        this.toaster.error('User ID not found. Please try logging in again.');
        return;
    }
    const internalPainting: InternalPainting = {
        customerId: this.customerId,
        carpetArea: this.requirementForm.get('carpetArea')?.value || '',
        productCode:this.requirementForm.get('productCode')?.value || '',
        color: this.requirementForm.get('color')?.value || '',
        ceilingType: this.requirementForm.get('ceilingType')?.value || '',
        ceilingPrice: this.requirementForm.get('ceilingPrice')?.value || 0,
        ceilingRemarsk: this.requirementForm.get('ceilingRemarsk')?.value || '',
        wallType: this.requirementForm.get('wallType')?.value || '',
        wallPrice: this.requirementForm.get('wallPrice')?.value || 0,
        wallRemarks: this.requirementForm.get('wallRemarks')?.value || '',
        noofWall: this.requirementForm.get('noofWall')?.value ? this.requirementForm.get('noofWall')?.value.toString() : '0',
        darkPrice: this.requirementForm.get('darkPrice')?.value || 0,
        darkRemarks: this.requirementForm.get('darkRemarks')?.value || '',
        sectionTotalPost_tax: this.requirementForm.get('sectionTotalPost_tax')?.value || 0,
        sectionTotalPre_tax: this.requirementForm.get('sectionTotalPre_tax')?.value || 0,
        totalRemarks: this.requirementForm.get('totalRemarks')?.value || '',
        createdBy: parseInt(userId),
        lastModifiedBy: parseInt(userId),
        createdOn: new Date(),
        lastModifiedDate: new Date()
    };
    if (this.currentInternalPainting?.internalPaintingId) {
        this.internalPaintingProvider.updateInternalPainting({ 
            ...internalPainting, 
            internalPaintingId: this.currentInternalPainting.internalPaintingId,
            lastModifiedBy: parseInt(userId),
            lastModifiedDate: new Date()
        });
    } else {
        this.internalPaintingProvider.addInternalPainting(internalPainting);
    }
}
  private setupListeners() {
    this.requirementForm.get('carpetArea')?.valueChanges.subscribe(() => {
      this.calculatePrices();
    });
    this.requirementForm.get('wallType')?.valueChanges.subscribe(() => {
      this.calculateWallPrice();
    });
    this.requirementForm.get('ceilingType')?.valueChanges.subscribe(() => {
      this.calculateCeilingPrice();
    });
    this.requirementForm.get('noofWall')?.valueChanges.subscribe(() => {
      this.calculateDarkWallPrice();
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
  private calculateDarkWallPrice() {
    const numberOfWalls = Number(this.requirementForm.get('noofWall')?.value) || 0;
    const darkWallRate = 2000;
    const darkPrice = numberOfWalls * darkWallRate;
    this.requirementForm.patchValue({
        darkPrice: darkPrice.toFixed(2)
    }, { emitEvent: false });

    this.calculateSectionTotal(); 
}
private calculateSectionTotal() {
  const wallPrice = Number(this.requirementForm.get('wallPrice')?.value) || 0;
  const ceilingPrice = Number(this.requirementForm.get('ceilingPrice')?.value) || 0;
  const darkPrice = Number(this.requirementForm.get('darkPrice')?.value) || 0; 
  const totalPreTax = wallPrice + ceilingPrice + darkPrice; 
  this.requirementForm.patchValue({
      sectionTotalPre_tax: totalPreTax.toFixed(2), 
      sectionTotalPost_tax: (totalPreTax * 1.18).toFixed(2) 
  }, { emitEvent: false });
}
}