// curtains.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, AbstractControl } from '@angular/forms';

interface CurtainForm {
  curtains: FormArray;
  windows: FormArray;
}

@Component({
  selector: 'app-curtains',
  templateUrl: './curtains.component.html',
  styleUrls: ['./curtains.component.css']
})
export class CurtainsComponent implements OnInit {
  curtainForm: FormGroup;
  
  curtainTypes = [
    'Solid + Sheer - Lintel Height',
    'Solid + Sheer - Ceiling Height',
    'Solid - Lintel Height',
    'Solid - Ceiling Height'
  ];
  
  fabricTypes = ['Budget', 'Premium', 'Luxury'];
  rodTypes = ['Budget', 'Premium', 'Luxury'];
  finialTypes = ['Budget', 'Premium', 'Luxury'];
  windowTypes = ['2 BHK', '2.5 BHK', '3 BHK', '4 BHK', '5 BHK'];
  packageTypes = ['Budget', 'Premium', 'Luxury', 'Custom'];

  constructor(private fb: FormBuilder) {
    this.curtainForm = this.fb.group({
      curtains: this.fb.array([]),
      windows: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addCurtainSet();
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

  // Helper method to safely cast AbstractControl to FormGroup
  getCurtainSetAsFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  createCurtainSet(): FormGroup {
    return this.fb.group({
      balconies: this.fb.array([this.createBalcony()])
    });
  }

  createBalcony(): FormGroup {
    return this.fb.group({
      curtain: this.fb.group({
        curtainType: [''],
        fabricType: [''],
        productCode: [''],
        price: [''],
        remarks: ['']
      }),
      rod: this.fb.group({
        rodType: [''],
        productCode: [''],
        price: [''],
        remarks: ['']
      }),
      finial: this.fb.group({
        finialType: [''],
        productCode: [''],
        price: [''],
        remarks: ['']
      })
    });
  }

  createWindow(): FormGroup {
    return this.fb.group({
      type: [''],
      package: [''],
      amount: [''],
      description: [''],
      remarks: ['']
    });
  }

  addCurtainSet() {
    this.curtains.push(this.createCurtainSet());
  }

  addBalcony(curtainIndex: number) {
    const balconies = this.curtains.at(curtainIndex).get('balconies') as FormArray;
    balconies.push(this.createBalcony());
  }

  addWindow() {
    this.windows.push(this.createWindow());
  }

  removeCurtainSet(index: number) {
    this.curtains.removeAt(index);
  }

  removeBalcony(curtainIndex: number, balconyIndex: number) {
    const balconies = this.curtains.at(curtainIndex).get('balconies') as FormArray;
    balconies.removeAt(balconyIndex);
  }

  removeWindow(index: number) {
    this.windows.removeAt(index);
  }
}