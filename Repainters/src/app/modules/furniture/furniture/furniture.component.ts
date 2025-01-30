// furniture.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

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
export class FurnitureComponent implements OnInit {
  furnitureForm!: FormGroup;
  
  // Product database
  productDatabase: { [key: string]: ProductData } = {
    'L001': {
      name: 'AUSTEN I',
      price: 29000,
      description: `Dimension: 4'(L) x 1'4"(D) x 2'10"(H)

About: This piece is a wooden storage cabinet with a sleek, rectangular design. The standout feature is its double-door front, adorned with an intricate geometric lattice pattern in a traditional style, complemented by a white backing to emphasize the details. The cabinet is supported by sturdy, slightly raised wooden legs, adding stability and a touch of modern minimalism. It features small, circular metal handles for easy access to the storage space inside. This cabinet is both decorative and functional, making it ideal for enhancing the aesthetic of any living or dining area.`
    },
    'L002':{
      name: 'AUSTEN II',
      price:39000,
      description:`Dimension: 6'(L) x 1'4""(D) x 2'10"(H)

 About:This piece is a wooden storage cabinet with a sleek, rectangular design. The standout feature is its double-door front, adorned with an intricate geometric lattice pattern in a traditional style, complemented by a white backing to emphasize the details. The cabinet is supported by sturdy, slightly raised wooden legs, adding stability and a touch of modern minimalism. It features small, circular metal handles for easy access to the storage space inside. This cabinet is both decorative and functional, making it ideal for enhancing the aesthetic of any living or dining area."
`
    },
    'L003':{
      name: 'AUSTEN III',
      price: 45000,
      description:`Dimension: 5'4"(L) x 1'4"(D) x 2'(H)

   About:This elegant media console blends intricate geometric inlay work with a natural wood finish, exuding timeless charm. Its spacious design features two cabinets, open shelving, and drawers, perfect for organizing and elevating living rooms or entertainment spaces."`
  },
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.furnitureForm = this.fb.group({
      furniture: this.fb.array([])
    });
    
    this.addFurniture();
  }

  get furniture() {
    return this.furnitureForm.get('furniture') as FormArray;
  }

  createFurniture(): FormGroup {
    return this.fb.group({
      productCode: [''],
      name: [{value: '', disabled: true}],
      price: [{value: '', disabled: true}],
      description: [{value: '', disabled: true}],
      remarks: ['']
    });
  }

  addFurniture() {
    const furnitureGroup = this.createFurniture();
    this.furniture.push(furnitureGroup);
    
    // Add value change subscription for product code
    const lastIndex = this.furniture.length - 1;
    furnitureGroup.get('productCode')?.valueChanges.subscribe(code => {
      this.updateFurnitureDetails(lastIndex, code);
    });
  }

  removeFurniture(index: number) {
    this.furniture.removeAt(index);
  }

  updateFurnitureDetails(index: number, code: string) {
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
  }

  formatDescription(description: string): string[] {
    if (!description) return [];
    return description.split('\n\n');
  }
}