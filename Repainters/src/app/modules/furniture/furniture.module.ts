import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureComponent } from './furniture/furniture.component';
import { ViewComponent } from './view/view.component';
import { furniturerouter } from './furniture.router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FurnitureComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    furniturerouter,
    ReactiveFormsModule
  ],
  exports:[
    FurnitureComponent
  ]
})
export class FurnitureModule { }
