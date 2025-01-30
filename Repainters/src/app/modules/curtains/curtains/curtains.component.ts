import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, AbstractControl } from '@angular/forms';

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

@Component({
  selector: 'app-curtains',
  templateUrl: './curtains.component.html',
  styleUrls: ['./curtains.component.css']
})
export class CurtainsComponent implements OnInit {
  curtainForm: FormGroup;

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

  // Rate constants for balcony curtains
  private readonly BALCONY_RATES = {
    SHEER: {
      Budget: 1133,
      Premium: 1642,
      Luxury: 2818
    },
    SOLID: {
      Budget: 609,
      Premium: 900,
      Luxury: 1801
    }
  };

  curtainTypes = this.curtainTypeObjects.map(ct => ct.name);
  windowTypes = this.windowTypeObjects.map(wt => wt.name);

  rodRates: PriceRate[] = [
    { type: 'Budget', rate: 300 },
    { type: 'Premium', rate: 400 },
    { type: 'Luxury', rate: 500 }
  ];

  finialRates: PriceRate[] = [
    { type: 'Budget', rate: 300 },
    { type: 'Premium', rate: 400 },
    { type: 'Luxury', rate: 500 }
  ];

  fabricTypes = ['Budget', 'Premium', 'Luxury'];
  rodTypes = this.rodRates.map(r => r.type);
  finialTypes = this.finialRates.map(f => f.type);

  constructor(private fb: FormBuilder) {
    this.curtainForm = this.fb.group({
      curtains: this.fb.array([]),
      windows: this.fb.array([]),
      sectionTotalE: [0],
      sectionTotalWindows: [0]
    });
  }

  ngOnInit() {
    this.addCurtainSet();
    this.addWindow();
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
    const balconyGroup = this.fb.group({
      curtain: this.fb.group({
        curtainType: [''],
        fabricType: [''],
        productCode: [''],
        price: [{ value: '', disabled: true }],
        remarks: ['']
      }),
      rod: this.fb.group({
        rodType: [''],
        productCode: [''],
        price: [{ value: '', disabled: true }],
        remarks: ['']
      }),
      finial: this.fb.group({
        finialType: [''],
        productCode: [''],
        price: [{ value: '', disabled: true }],
        remarks: ['']
      })
    });

    this.setupFormSubscriptions(balconyGroup, false);
    return balconyGroup;
  }

  createWindow(): FormGroup {
    const windowGroup = this.fb.group({
      curtain: this.fb.group({
        curtainType: [''],
        fabricType: [''],
        productCode: [''],
        price: [{ value: '', disabled: true }],
        remarks: ['']
      }),
      rod: this.fb.group({
        rodType: [''],
        productCode: [''],
        price: [{ value: '', disabled: true }],
        remarks: ['']
      }),
      finial: this.fb.group({
        finialType: [''],
        productCode: [''],
        price: [{ value: '', disabled: true }],
        remarks: ['']
      })
    });

    this.setupFormSubscriptions(windowGroup, true);
    return windowGroup;
  }

  setupFormSubscriptions(group: FormGroup, isWindow: boolean) {
    const curtainGroup = group.get('curtain') as FormGroup;
    curtainGroup.get('curtainType')?.valueChanges.subscribe(() => {
      if (isWindow) {
        this.calculateWindowPrice(curtainGroup);
      } else {
        this.calculateBalconyPrice(curtainGroup);
      }
    });
    curtainGroup.get('fabricType')?.valueChanges.subscribe(() => {
      if (isWindow) {
        this.calculateWindowPrice(curtainGroup);
      } else {
        this.calculateBalconyPrice(curtainGroup);
      }
    });

    const rodGroup = group.get('rod') as FormGroup;
    rodGroup.get('rodType')?.valueChanges.subscribe(() => {
      this.calculateRodPrice(rodGroup);
    });

    const finialGroup = group.get('finial') as FormGroup;
    finialGroup.get('finialType')?.valueChanges.subscribe(() => {
      this.calculateFinialPrice(finialGroup);
    });
  }

  calculateWindowPrice(curtainGroup: FormGroup) {
    const curtainType = curtainGroup.get('curtainType')?.value;
    const fabricType = curtainGroup.get('fabricType')?.value;

    if (curtainType && fabricType) {
      const selectedWindow = this.windowTypeObjects.find(wt => wt.name === curtainType);
      if (selectedWindow) {
        const price = selectedWindow.meters * selectedWindow.rates[fabricType as keyof typeof selectedWindow.rates];
        curtainGroup.patchValue({ price }, { emitEvent: false });
        this.updateSectionTotals();
      }
    }
  }

  calculateBalconyPrice(curtainGroup: FormGroup) {
    const curtainType = curtainGroup.get('curtainType')?.value;
    const fabricType = curtainGroup.get('fabricType')?.value;

    if (curtainType && fabricType) {
      const selectedCurtain = this.curtainTypeObjects.find(ct => ct.name === curtainType);
      if (selectedCurtain) {
        const rates = selectedCurtain.isSolidOnly ? 
          this.BALCONY_RATES.SOLID : 
          this.BALCONY_RATES.SHEER;
        
        const rateForType = rates[fabricType as keyof typeof rates];
        const price = selectedCurtain.meters * rateForType;
        
        curtainGroup.patchValue({ price }, { emitEvent: false });
        this.updateSectionTotals();
      }
    }
  }

  calculateRodPrice(rodGroup: FormGroup) {
    const rodType = rodGroup.get('rodType')?.value;
    if (rodType) {
      const selectedRodRate = this.rodRates.find(r => r.type === rodType);
      if (selectedRodRate) {
        rodGroup.patchValue({
          price: selectedRodRate.rate
        }, { emitEvent: false });
        this.updateSectionTotals();
      }
    }
  }

  calculateFinialPrice(finialGroup: FormGroup) {
    const finialType = finialGroup.get('finialType')?.value;
    if (finialType) {
      const selectedFinialRate = this.finialRates.find(f => f.type === finialType);
      if (selectedFinialRate) {
        finialGroup.patchValue({
          price: selectedFinialRate.rate
        }, { emitEvent: false });
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
        const curtainPrice = balconyGroup.get('curtain.price')?.value || 0;
        const rodPrice = balconyGroup.get('rod.price')?.value || 0;
        const finialPrice = balconyGroup.get('finial.price')?.value || 0;
        balconyTotal += curtainPrice + rodPrice + finialPrice;
      });
    });

    // Calculate window total
    this.windows.controls.forEach(window => {
      const windowGroup = window as FormGroup;
      const curtainPrice = windowGroup.get('curtain.price')?.value || 0;
      const rodPrice = windowGroup.get('rod.price')?.value || 0;
      const finialPrice = windowGroup.get('finial.price')?.value || 0;
      windowTotal += curtainPrice + rodPrice + finialPrice;
    });

    this.curtainForm.patchValue({
      sectionTotalE: balconyTotal,
      sectionTotalWindows: windowTotal
    }, { emitEvent: false });
  }

  addCurtainSet() {
    this.curtains.push(this.createCurtainSet());
  }

  addWindow() {
    this.windows.push(this.createWindow());
  }

  removeCurtainSet(index: number) {
    this.curtains.removeAt(index);
    this.updateSectionTotals();
  }

  removeWindow(index: number) {
    this.windows.removeAt(index);
    this.updateSectionTotals();
  }
}