import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoorGrillsComponent } from './door-grills/door-grills.component';
import { ViewComponent } from './view/view.component';
import { door_grillsrouter } from './door-grills.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DoorGrillsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    door_grillsrouter,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    DoorGrillsComponent
  ]
})
export class DoorGrillsModule { }
