import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { ViewComponent } from './view/view.component';
import { enquiryrouter } from './enquiry.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  declarations: [
    EnquiryComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    enquiryrouter,
    ReactiveFormsModule,
    GoogleMapsModule,
    FormsModule
  ],
  exports:[
    ViewComponent
  ]
})
export class EnquiryModule { }
