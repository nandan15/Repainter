import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerViewComponent } from './view/view.component';
import { CustomerRouter } from './customer.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SidebarModule } from '../sidebar/sidebar.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
@NgModule({
  declarations: [
    CustomerComponent,
    CustomerViewComponent,
    UploadDialogComponent,
    CustomerModalComponent
    CustomerModalComponent,
  ],
  imports: [
    CommonModule,
    CustomerRouter,
    FormsModule,
    SidebarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
})
export class CustomerModule { }
