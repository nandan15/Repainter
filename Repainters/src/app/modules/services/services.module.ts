import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services/services.component';
import { ViewComponent } from './view/view.component';
import { servicesrouter } from './services.router';



@NgModule({
  declarations: [
    ServicesComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    servicesrouter
  ],
  exports:[
    ServicesComponent
  ]
})
export class ServicesModule { }
