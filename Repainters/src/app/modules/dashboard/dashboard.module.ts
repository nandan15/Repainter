import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardViewComponent } from './view/view.component';
import { dashboardRouter } from './dashboard.router';

import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardViewComponent
  ],
  imports: [
    CommonModule,
    dashboardRouter,
    SidebarModule
    
  ],
})
export class DashboardModule { }
