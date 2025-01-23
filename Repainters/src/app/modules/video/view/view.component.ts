import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      about: new FormGroup({}),
      product: new FormGroup({}),
      project: new FormGroup({}),
      general: new FormGroup({})
    });
  }

  activeTabIndex: number = 0;

  onTabChange(event: any) {
    this.activeTabIndex = event;
  }
}
