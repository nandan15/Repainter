import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerViewComponent } from './view/view.component';
import { CustomerRouter } from './customer.router';
import { FormsModule } from '@angular/forms'; 
import { SidebarModule } from '../sidebar/sidebar.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    CustomerComponent,
    CustomerViewComponent
  ],
  imports: [
    CommonModule,
    CustomerRouter,
    FormsModule,
    SidebarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CustomerModule { }
