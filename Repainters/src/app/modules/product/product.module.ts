import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ViewComponent } from './view/view.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { productRouter } from './product.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    ProductComponent,
    ViewComponent,
    AddproductComponent
  ],
  imports: [
    CommonModule,
    productRouter,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class ProductModule { }
