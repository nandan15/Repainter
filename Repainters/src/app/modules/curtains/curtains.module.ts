import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurtainsComponent } from './curtains/curtains.component';
import { ViewComponent } from './view/view.component';
import { curtainsrouter } from './curtains.router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CurtainsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    curtainsrouter,
    ReactiveFormsModule
  ],
  exports:[
    CurtainsComponent
  ]
})
export class CurtainsModule { }
