import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoorGrillsComponent } from './door-grills/door-grills.component';
import { ViewComponent } from './view/view.component';
import { door_grillsrouter } from './door-grills.router';



@NgModule({
  declarations: [
    DoorGrillsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    door_grillsrouter
  ],
  exports:[
    DoorGrillsComponent
  ]
})
export class DoorGrillsModule { }
