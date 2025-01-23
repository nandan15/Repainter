import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-paneling',
  templateUrl: './paneling.component.html',
  styleUrls: ['./paneling.component.css']
})
export class PanelingComponent implements OnInit {
  panelingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    // Add initial 4 walls
    for (let i = 0; i < 4; i++) {
      this.addWall();
    }
  }

  initializeForm() {
    this.panelingForm = this.fb.group({
      walls: this.fb.array([]),
      sectionTotal: [0]
    });
  }

  get wallsArray() {
    return this.panelingForm.get('walls') as FormArray;
  }

  createWallFormGroup(): FormGroup {
    return this.fb.group({
      productCode: [''],
      product: [''],
      room: [''],
      description: ['']
    });
  }

  addWall() {
    const walls = this.panelingForm.get('walls') as FormArray;
    walls.push(this.createWallFormGroup());
  }

  removeWall(index: number) {
    const walls = this.panelingForm.get('walls') as FormArray;
    walls.removeAt(index);
  }
}