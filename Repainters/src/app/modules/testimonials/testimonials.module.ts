import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ViewComponent } from './view/view.component';
import { testimonialsRouter } from './testimonials.router';
import { SidebarModule } from '../sidebar/sidebar.module';



@NgModule({
  declarations: [
    TestimonialsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    testimonialsRouter,
    SidebarModule
  ]
})
export class TestimonialsModule { }
