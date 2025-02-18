// additionals.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-additionals',
  templateUrl: './additionals.component.html',
  styleUrls: ['./additionals.component.css']
})
export class AdditionalsComponent {
  panelOpenState = false;
  additionalForm: FormGroup;
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private fb: FormBuilder) {
    this.additionalForm = this.fb.group({
      description: [''],
      quantity: [1],
      price: [0],
      amount: [0]
    });
    this.additionalForm.get('quantity')?.valueChanges.subscribe(() => this.calculateAmount());
    this.additionalForm.get('price')?.valueChanges.subscribe(() => this.calculateAmount());
  }

  calculateAmount() {
    const quantity = this.additionalForm.get('quantity')?.value || 0;
    const price = this.additionalForm.get('price')?.value || 0;
    this.additionalForm.patchValue({ amount: quantity * price }, { emitEvent: false });
  }
}