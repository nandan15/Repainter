import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import {Curtain}from 'src/app/Shared/models/curtain';
import { CurtainProvider } from 'src/app/Shared/Provider/CurtainProvider';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
type FabricType = 'Classic' | 'Premium' | 'Azzure';
type RateCategory = 'Budget' | 'Premium' | 'Luxury';
interface CurtainType {
  name: string;
  meters: number;
  isSolidOnly: boolean;
}
interface WindowType {
  name: string;
  meters: number;
  rates: {
    Budget: number;
    Premium: number;
    Luxury: number;
  };
}
interface PriceRate {
  type: string;
  rate: number;
}
interface CurtainRates {
  Classic: number;
  Premium: number;
  Azzure: number;
}
@Component({
  selector: 'app-curtains',
  templateUrl: './curtains.component.html',
  styleUrls: ['./curtains.component.css']
})
export class CurtainsComponent implements OnInit {
  private destroy$ = new Subject<void>();
  customerId: number | null = null;
  curtainForm: FormGroup;
  @Input() currentCurtain: Curtain = new Curtain();
  showCurtainSection=false;
  showWindowSection=false;
  curtainTypeObjects: CurtainType[] = [
    { name: 'Solid + Sheer - Lintel Height', meters: 17, isSolidOnly: false },
    { name: 'Solid + Sheer - Ceiling Height', meters: 22, isSolidOnly: false },
    { name: 'Solid - Lintel Height', meters: 17, isSolidOnly: true },
    { name: 'Solid - Ceiling Height', meters: 22, isSolidOnly: true }
  ];

  windowTypeObjects: WindowType[] = [
    {
      name: 'Solid + Sheer - Lintel Height',
      meters: 5,
      rates: { Budget: 1133, Premium: 1642, Luxury: 2818 }
    },
    {
      name: 'Solid + Sheer - Ceiling Height',
      meters: 14,
      rates: { Budget: 1133, Premium: 1642, Luxury: 2818 }
    },
    {
      name: 'SOLID - LINTEL HEIGHT',
      meters: 5,
      rates: { Budget: 609, Premium: 900, Luxury: 1801 }
    },
    {
      name: 'SOLID - CEILING HEIGHT',
      meters: 14,
      rates: { Budget: 609, Premium: 900, Luxury: 1801 }
    },
    {
      name: 'ROMAN BLIND - WITH LINING',
      meters: 5,
      rates: { Budget: 765, Premium: 900, Luxury: 1801 }
    },
    {
      name: 'ROMAN BLIND - WITH 80% BLACKOUT LINING',
      meters: 5,
      rates: { Budget: 897, Premium: 1188, Luxury: 2088 }
    }
  ];
  private readonly BALCONY_RATES: {
    SHEER: CurtainRates;
    SOLID: CurtainRates;
  } = {
    SHEER: {
      Classic: 1133,
      Premium: 1642,
      Azzure: 2818
    },
    SOLID: {
      Classic: 609,
      Premium: 900,
      Azzure: 1801
    }
  };
  fabricTypes: FabricType[] = ['Classic', 'Premium', 'Azzure'];
  curtainTypes = this.curtainTypeObjects.map(ct => ct.name);
  windowTypes = this.windowTypeObjects.map(wt => wt.name);
  rodRates: PriceRate[] = [
    { type: 'Classic', rate: 300 },
    { type: 'Premium', rate: 400 },
    { type: 'Azzure', rate: 500 }
  ];
  finialRates: PriceRate[] = [
    { type: 'Classic', rate: 300 },
    { type: 'Premium', rate: 400 },
    { type: 'Azzure', rate: 500 }
  ];
  rodTypes = this.rodRates.map(r => r.type);
  finialTypes = this.finialRates.map(f => f.type);
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private curtainProvider: CurtainProvider,
    private toaster: ToastrService, private cdr: ChangeDetectorRef 
  ) {
    this.curtainForm = this.fb.group({
      curtains: this.fb.array([]),
      windows: this.fb.array([]),
      SectionTotalCurtain: ['0', Validators.required], 
      SectionTotalWindow: [0, Validators.required],
      SectionTotal: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.extractCustomerId();
    if (this.customerId) {
      this.loadCurtainData();
    } else {
      this.addCurtainSet();
      this.addWindow();
      const initialCurtainSet = this.curtains.at(0) as FormGroup;
      const balconiesArray = this.getBalconies(initialCurtainSet);
      balconiesArray.controls.forEach(balcony => {
        this.setupFormSubscriptions(balcony as FormGroup, false);
      });
      const initialWindow = this.windows.at(0) as FormGroup;
      this.setupFormSubscriptions(initialWindow, true);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private extractCustomerId(): void {
    this.route.parent?.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const customerIdParam = params.get('customerId');
        this.customerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
      });
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const customerIdParam = params.get('customerId');
        if (customerIdParam) {
          this.customerId = parseInt(customerIdParam, 10);
        }
      });
    if (this.currentCurtain?.customerId) {
      this.customerId = this.currentCurtain.customerId;
    }
  }
saveCurtains() {
  const userId = localStorage.getItem('UserId');
  if (!userId) {
    this.toaster.error('User ID not found, Please try logging in again.');
    return;
  }

  if (this.curtainForm.valid) {
    const formValue = this.curtainForm.value;
    const newCurtains: {
      curtainId: number; 
      curtainTabId: boolean; generatedId: boolean; customerId: number;
      curtainType: any; fabricType: any; productCode: any; price: any; curtainRemarks: any;
      rodType: any; rodProductCode: any; rodPrice: any; rodRemarks: any;
      finialType: any; finialProductCode: any; finialPrice: any; finialRemarks: any;
      windowCurtainType: any; windowFabricType: any; windowCurtainProductCode: any; windowCurtainPrice: any; windowCurtainRemarks: any; windowRodType: any; windowRodProductCode: any; windowRodPrice: any; windowRodRemarks: any; windowFinialType: any; windowFinialProductCode: any; windowFinialPrice: any; windowFinialRemarks: any;
      // Section totals
      sectionTotalCurtain: any; sectionTotalWindow: any; sectionTotal: any;
      // Meta fields
      deleted: boolean; createdBy: number; createdOn: Date; lastModifiedBy: number; lastModifiedOn: Date;
    }[] = [];
    const existingCurtainIds = new Set();

    // If we have an existing curtain, record its ID
    if (this.currentCurtain?.curtainId) {
      existingCurtainIds.add(this.currentCurtain.curtainId);
    }

    // Process each curtain set
    formValue.curtains.forEach((curtainSet: any) => {
      if (curtainSet.balconies && curtainSet.balconies.length > 0) {
        curtainSet.balconies.forEach((balcony: any) => {
          // Only process if this is a new balcony (not existing in database)
          if (!existingCurtainIds.has(balcony.curtainId)) {
            const curtainData = {
              curtainId: 0, // New record
              curtainTabId: true,
              generatedId: true,
              customerId: this.customerId || 0,
              
              // Curtain details
              curtainType: balcony.curtain.CurtainType,
              fabricType: balcony.curtain.FabricType,
              productCode: balcony.curtain.ProductCode,
              price: balcony.curtain.Price,
              curtainRemarks: balcony.curtain.CurtainRemarks,
              
              // Rod details
              rodType: balcony.rod.RodType,
              rodProductCode: balcony.rod.RodProductCode,
              rodPrice: balcony.rod.RodPrice,
              rodRemarks: balcony.rod.RodRemarks,
              
              // Finial details
              finialType: balcony.finial.FinialType,
              finialProductCode: balcony.finial.FinialProductCode,
              finialPrice: balcony.finial.FinialPrice,
              finialRemarks: balcony.finial.FinialRemarks,
              
              // Window details (from the first window if exists)
              windowCurtainType: formValue.windows[0]?.curtain.WindowCurtainType || '',
              windowFabricType: formValue.windows[0]?.curtain.WindowFabricType || '',
              windowCurtainProductCode: formValue.windows[0]?.curtain.WindowCurtainProductCode || '',
              windowCurtainPrice: formValue.windows[0]?.curtain.WindowCurtainPrice || 0,
              windowCurtainRemarks: formValue.windows[0]?.curtain.WindowCurtainRemarks || '',
              
              windowRodType: formValue.windows[0]?.rod.WindowRodType || '',
              windowRodProductCode: formValue.windows[0]?.rod.WindowRodProductCode || '',
              windowRodPrice: formValue.windows[0]?.rod.WindowRodPrice || 0,
              windowRodRemarks: formValue.windows[0]?.rod.WindowRodRemarks || '',
              
              windowFinialType: formValue.windows[0]?.finial.WindowFinialType || '',
              windowFinialProductCode: formValue.windows[0]?.finial.WindowFinialProductCode || '',
              windowFinialPrice: formValue.windows[0]?.finial.WindowFinialPrice || 0,
              windowFinialRemarks: formValue.windows[0]?.finial.WindowFinialRemarks || '',
              
              // Section totals
              sectionTotalCurtain: formValue.SectionTotalCurtain,
              sectionTotalWindow: formValue.SectionTotalWindow,
              sectionTotal: formValue.SectionTotal,
              
              // Meta fields
              deleted: false,
              createdBy: parseInt(userId),
              createdOn: new Date(),
              lastModifiedBy: parseInt(userId),
              lastModifiedOn: new Date()
            };
            
            newCurtains.push(curtainData);
          }
        });
      }
    });

    // If we have new curtains to save
    if (newCurtains.length > 0) {
      // Use forkJoin to handle multiple saves in parallel
      forkJoin(
        newCurtains.map(curtainData => 
          this.curtainProvider.addCurtain(curtainData)
        )
      ).subscribe({
        next: (responses) => {
          // Show success popup
          Swal.fire({
            title: 'Success!',
            text: 'Curtain details saved successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Reload the data to refresh the form
            this.loadCurtainData();
          });
        },
        error: (error) => {
          console.error('Error saving curtain details:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to save curtain details. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      // If no new curtains to save
      this.toaster.info('No new curtain details to save');
    }
  } else {
    // Form validation failed
    this.markFormGroupTouched(this.curtainForm);
    this.toaster.error('Please fill in all required fields');
    this.highlightInvalidFields();
  }
}
  private loadCurtainData() {
    this.curtainProvider.getCurtainByCustomerId(this.customerId!).subscribe({
      next: (curtains: Curtain[]) => {
        if (curtains && curtains.length > 0) {
          const curtainData = curtains[0]; // Assuming we're working with the first curtain
          this.populateFormWithData(curtainData);
        } else {
          // If no data exists, initialize with empty forms
          this.addCurtainSet();
          this.addWindow();
        }
      },
      error: (error) => {
        console.error('Error loading curtain data:', error);
        this.toaster.error('Failed to load curtain data');
        // Initialize empty forms on error
        this.addCurtainSet();
        this.addWindow();
      }
    });
  }

  private populateFormWithData(curtainData: Curtain) {
    // Clear existing form arrays
    while (this.curtains.length) {
      this.curtains.removeAt(0);
    }
    while (this.windows.length) {
      this.windows.removeAt(0);
    }
  
    // Create and populate curtain/balcony section
    const curtainSet = this.createCurtainSet();
    const balcony = (curtainSet.get('balconies') as FormArray).at(0) as FormGroup;
    
    balcony.patchValue({
      curtain: {
        CurtainType: curtainData.curtainType,
        FabricType: curtainData.fabricType,
        ProductCode: curtainData.productCode,
        Price: curtainData.price,
        CurtainRemarks: curtainData.curtainRemarks
      },
      rod: {
        RodType: curtainData.rodType,
        RodProductCode: curtainData.rodProductCode,
        RodPrice: curtainData.rodPrice,
        RodRemarks: curtainData.rodRemarks
      },
      finial: {
        FinialType: curtainData.finialType,
        FinialProductCode: curtainData.finialProductCode,
        FinialPrice: curtainData.finialPrice,
        FinialRemarks: curtainData.finialRemarks
      }
    });
  
    this.curtains.push(curtainSet);
  
    // Create and populate window section
    const window = this.createWindow();
    window.patchValue({
      curtain: {
        WindowCurtainType: curtainData.windowCurtainType,
        WindowFabricType: curtainData.windowFabricType,
        WindowCurtainProductCode: curtainData.windowCurtainProductCode,
        WindowCurtainPrice: curtainData.windowCurtainPrice,
        WindowCurtainRemarks: curtainData.windowCurtainRemarks
      },
      rod: {
        WindowRodType: curtainData.windowRodType,
        WindowRodProductCode: curtainData.windowRodProductCode,
        WindowRodPrice: curtainData.windowRodPrice,
        WindowRodRemarks: curtainData.windowRodRemarks
      },
      finial: {
        WindowFinialType: curtainData.windowFinialType,
        WindowFinialProductCode: curtainData.windowFinialProductCode,
        WindowFinialPrice: curtainData.windowFinialPrice,
        WindowFinialRemarks: curtainData.windowFinialRemarks
      }
    });
  
    this.windows.push(window);
  
    // Set section totals
    this.curtainForm.patchValue({
      SectionTotalCurtain: curtainData.sectionTotalCurtain,
      SectionTotalWindow: curtainData.sectionTotalWindow,
      SectionTotal: curtainData.sectionTotal
    });
  
    // Setup subscriptions after populating data
    const balconiesArray = this.getBalconies(curtainSet);
    balconiesArray.controls.forEach(balcony => {
      this.setupFormSubscriptions(balcony as FormGroup, false);
    });
    this.setupFormSubscriptions(window, true);
  
    // Recalculate totals
    this.updateSectionTotals();
  }
  
  private highlightInvalidFields() {
    const invalidControls = this.findInvalidControls(this.curtainForm);
    console.log('Invalid controls:', invalidControls);
  }

  private findInvalidControls(formGroup: FormGroup | FormArray): string[] {
    const invalid: string[] = [];
    
    if (formGroup instanceof FormGroup) {
      const controls = formGroup.controls;
      for (const name in controls) {
        if (controls.hasOwnProperty(name)) {
          const control = controls[name];
          if (control.invalid) {
            if (control instanceof FormGroup || control instanceof FormArray) {
              invalid.push(...this.findInvalidControls(control));
            } else {
              invalid.push(name);
            }
          }
        }
      }
    } else if (formGroup instanceof FormArray) {
      formGroup.controls.forEach((control, index) => {
        if (control.invalid) {
          if (control instanceof FormGroup || control instanceof FormArray) {
            invalid.push(...this.findInvalidControls(control));
          } else {
            invalid.push(index.toString());
          }
        }
      });
    }
    
    return invalid;
  }
  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
   get curtains(): FormArray {
    return this.curtainForm.get('curtains') as FormArray;
  }

  get windows(): FormArray {
    return this.curtainForm.get('windows') as FormArray;
  }

  getBalconies(curtainSet: AbstractControl): FormArray {
    return (curtainSet as FormGroup).get('balconies') as FormArray;
  }

  createCurtainSet(): FormGroup {
    return this.fb.group({
      balconies: this.fb.array([this.createBalcony()])
    });
  }


  createBalcony(): FormGroup {
    return this.fb.group({
      curtain: this.fb.group({
        CurtainType: ['', Validators.required],
        FabricType: ['', Validators.required],
        ProductCode: ['', Validators.required],
        Price: [0, [Validators.required, Validators.min(0)]],
        CurtainRemarks: ['', Validators.required]
      }),
      rod: this.fb.group({
        RodType: ['', Validators.required],
        RodProductCode: ['', Validators.required],
        RodPrice: [0, [Validators.required, Validators.min(0)]],
        RodRemarks: ['', Validators.required]
      }),
      finial: this.fb.group({
        FinialType: ['', Validators.required],
        FinialProductCode: ['', Validators.required],
        FinialPrice: [0, [Validators.required, Validators.min(0)]],
        FinialRemarks: ['', Validators.required]
      })
    });
  }

  createWindow(): FormGroup {
    return this.fb.group({
      curtain: this.fb.group({
        WindowCurtainType: ['', Validators.required],
        WindowFabricType: ['', Validators.required],
        WindowCurtainProductCode: ['', Validators.required],
        WindowCurtainPrice: [0, [Validators.required, Validators.min(0)]],
        WindowCurtainRemarks: ['', Validators.required]
      }),
      rod: this.fb.group({
        WindowRodType: ['', Validators.required],
        WindowRodProductCode: ['', Validators.required],
        WindowRodPrice: [0, [Validators.required, Validators.min(0)]],
        WindowRodRemarks: ['', Validators.required]
      }),
      finial: this.fb.group({
        WindowFinialType: ['', Validators.required],
        WindowFinialProductCode: ['', Validators.required],
        WindowFinialPrice: [0, [Validators.required, Validators.min(0)]],
        WindowFinialRemarks: ['', Validators.required]
      })
    });
  }
  setupFormSubscriptions(group: FormGroup, isWindow: boolean) {
    const curtainGroup = group.get('curtain') as FormGroup;
    const rodGroup = group.get('rod') as FormGroup;
    const finialGroup = group.get('finial') as FormGroup;
    
    if (isWindow) {
      curtainGroup.get('WindowCurtainType')?.valueChanges.subscribe(() => {
        this.calculateWindowPrice(curtainGroup);
      });
      curtainGroup.get('WindowFabricType')?.valueChanges.subscribe(() => {
        this.calculateWindowPrice(curtainGroup);
      });
      
      rodGroup.get('WindowRodType')?.valueChanges.subscribe(() => {
        this.calculateRodPrice(rodGroup, true);
      });
      
      finialGroup.get('WindowFinialType')?.valueChanges.subscribe(() => {
        this.calculateFinialPrice(finialGroup, true);
      });
    } else {
      curtainGroup.get('CurtainType')?.valueChanges.subscribe(() => {
        this.calculateBalconyPrice(curtainGroup);
      });
      curtainGroup.get('FabricType')?.valueChanges.subscribe(() => {
        this.calculateBalconyPrice(curtainGroup);
      });
      
      rodGroup.get('RodType')?.valueChanges.subscribe(() => {
        this.calculateRodPrice(rodGroup, false);
      });
      
      finialGroup.get('FinialType')?.valueChanges.subscribe(() => {
        this.calculateFinialPrice(finialGroup, false);
      });
    }
  }
  calculateWindowPrice(curtainGroup: FormGroup) {
    const curtainType = curtainGroup.get('WindowCurtainType')?.value;
    const fabricType = curtainGroup.get('WindowFabricType')?.value as FabricType;
  
    if (curtainType && fabricType) {
      const selectedWindow = this.windowTypeObjects.find(wt => wt.name === curtainType);
      if (selectedWindow) {
        // Map fabric types to rate categories
        const rateCategory: RateCategory = 
          fabricType === 'Classic' ? 'Budget' :
          fabricType === 'Premium' ? 'Premium' :
          'Luxury';
        
        const rate = selectedWindow.rates[rateCategory];
        const price = selectedWindow.meters * rate;
        
        curtainGroup.patchValue({ WindowCurtainPrice: price }, { emitEvent: false });
        this.updateSectionTotals();
      }
    }
  }

  calculateBalconyPrice(curtainGroup: FormGroup) {
    const curtainType = curtainGroup.get('CurtainType')?.value;
    const fabricType = curtainGroup.get('FabricType')?.value as FabricType;
  
    if (curtainType && fabricType) {
      const selectedCurtain = this.curtainTypeObjects.find(ct => ct.name === curtainType);
      if (selectedCurtain) {
        const rates = selectedCurtain.isSolidOnly ? 
          this.BALCONY_RATES.SOLID : 
          this.BALCONY_RATES.SHEER;
        
        // Now TypeScript knows fabricType can only be 'Classic', 'Premium', or 'Azzure'
        const price = selectedCurtain.meters * rates[fabricType];
        curtainGroup.patchValue({ Price: price }, { emitEvent: false });
        this.updateSectionTotals();
      }
    }
  }

  calculateRodPrice(rodGroup: FormGroup, isWindow: boolean) {
    const rodType = rodGroup.get(isWindow ? 'WindowRodType' : 'RodType')?.value;
    if (rodType) {
      const selectedRodRate = this.rodRates.find(r => r.type === rodType);
      if (selectedRodRate) {
        if (isWindow) {
          rodGroup.patchValue({ WindowRodPrice: selectedRodRate.rate }, { emitEvent: false });
        } else {
          rodGroup.patchValue({ RodPrice: selectedRodRate.rate }, { emitEvent: false });
        }
        this.updateSectionTotals();
      }
    }
  }
  
  calculateFinialPrice(finialGroup: FormGroup, isWindow: boolean) {
    const finialType = finialGroup.get(isWindow ? 'WindowFinialType' : 'FinialType')?.value;
    if (finialType) {
      const selectedFinialRate = this.finialRates.find(f => f.type === finialType);
      if (selectedFinialRate) {
        if (isWindow) {
          finialGroup.patchValue({ WindowFinialPrice: selectedFinialRate.rate }, { emitEvent: false });
        } else {
          finialGroup.patchValue({ FinialPrice: selectedFinialRate.rate }, { emitEvent: false });
        }
        this.updateSectionTotals();
      }
    }
  }

  updateSectionTotals() {
    let balconyTotal = 0;
    let windowTotal = 0;
  
    // Calculate balcony total
    this.curtains.controls.forEach(curtainSet => {
      const balconies = this.getBalconies(curtainSet);
      balconies.controls.forEach(balcony => {
        const balconyGroup = balcony as FormGroup;
        
        const curtainPrice = Number(balconyGroup.get('curtain.Price')?.value || 0);
        const rodPrice = Number(balconyGroup.get('rod.RodPrice')?.value || 0);
        const finialPrice = Number(balconyGroup.get('finial.FinialPrice')?.value || 0);
        
        balconyTotal += curtainPrice + rodPrice + finialPrice;
      });
    });
  
    // Calculate window total
    this.windows.controls.forEach(window => {
      const windowGroup = window as FormGroup;
      
      const curtainPrice = Number(windowGroup.get('curtain.WindowCurtainPrice')?.value || 0);
      const rodPrice = Number(windowGroup.get('rod.WindowRodPrice')?.value || 0);
      const finialPrice = Number(windowGroup.get('finial.WindowFinialPrice')?.value || 0);
      
      windowTotal += curtainPrice + rodPrice + finialPrice;
    });
  
    // Update form values with string conversion for curtain total
    this.curtainForm.patchValue({
      SectionTotalCurtain: balconyTotal.toString(),
      SectionTotalWindow: windowTotal.toString(), // Convert to string for consistency
      SectionTotal: (balconyTotal + windowTotal).toString()
    }, { emitEvent: false });
  
    // Trigger change detection
    this.cdr.detectChanges();
  }
  addCurtainSet() {
    const newSet = this.createCurtainSet();
    this.curtains.push(newSet);
    const balconiesArray = this.getBalconies(newSet);
    balconiesArray.controls.forEach(balcony => {
      this.setupFormSubscriptions(balcony as FormGroup, false);
    });
    this.updateSectionTotals(); // Update totals
  }
  
  addWindow() {
    const newWindow = this.createWindow();
    this.windows.push(newWindow);
    this.setupFormSubscriptions(newWindow, true);
    this.updateSectionTotals();
    this.cdr.detectChanges();
  }
  
  removeCurtainSet(index: number) {
    this.curtains.removeAt(index);
    this.updateSectionTotals(); // Update totals
  }
  
  removeWindow(index: number) {
    this.windows.removeAt(index);
    this.updateSectionTotals(); // Update totals
  }
}