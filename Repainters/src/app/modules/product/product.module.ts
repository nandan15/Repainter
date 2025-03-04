import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ViewComponent } from './view/view.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import {  ProductRoutingModule } from './product.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddPreviewComponent } from './add-preview/add-preview.component';
import { CategoryviewComponent } from './categoryview/categoryview.component';
@NgModule({
  declarations: [
    ProductComponent,
    ViewComponent,
    AddproductComponent,
    AddPreviewComponent,
    CategoryviewComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class ProductModule { }
