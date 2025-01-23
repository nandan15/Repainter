import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementComponent } from './requirement/requirement.component';
import { ViewComponent } from './view/view.component';
import { requirementRouter } from './requirement.router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import{MatSelectModule}from'@angular/material/select';
@NgModule({
  declarations: [
    RequirementComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    requirementRouter,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports:[
    RequirementComponent
  ]
})
export class RequiremetnModule { }
