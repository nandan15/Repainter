import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageComponent } from './package/package.component';
import { ViewComponent } from './view/view.component';
import { packagerouter } from './package.router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    PackageComponent,
    ViewComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    packagerouter,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports:[
    PackageComponent,
    DashboardComponent

  ]
})
export class PackageModule { }
