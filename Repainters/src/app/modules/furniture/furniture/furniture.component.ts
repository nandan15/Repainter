// furniture.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {
  furnitureForm!: FormGroup;
  
  packageType = [
    'Budget',
    'Premium',
    'Luxury',
    'Custom'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.furnitureForm = this.fb.group({
      furniture: this.fb.array([])
    });

    // Initialize with one furniture section
    this.addFurniture();
  }

  get furniture() {
    return this.furnitureForm.get('furniture') as FormArray;
  }

  createFurniture(): FormGroup {
    return this.fb.group({
      productCode: [''],
      type: [''],
      room: [''],
      description: [''],
      remarks: ['']
    });
  }

  addFurniture() {
    this.furniture.push(this.createFurniture());
  }

  removeFurniture(index: number) {
    this.furniture.removeAt(index);
  }
}