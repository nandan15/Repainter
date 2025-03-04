import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalsComponent } from './additionals/additionals.component';
import { ViewComponent } from './view/view.component';
import { AdditionalRouter } from './additionals.router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AdditionalsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    AdditionalRouter,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports:[
    AdditionalsComponent
  ]
})
export class AdditionalsModule { }
