import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementComponent } from './procurement/procurement.component';
import { ViewComponent } from './view/view.component';
import { procurementrouter } from './procurement.router';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [
    ProcurementComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    procurementrouter,
    SidebarModule
  ]
})
export class ProcurementModule { }
