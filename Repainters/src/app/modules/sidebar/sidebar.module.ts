import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewComponent } from './view/view.component';
import { sidebarRouter } from './sidebar.router';

import { FileText, LucideAngularModule, MessageCircle, Package, Settings, Truck, UserCircle, Users, Video } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
      SidebarComponent,
      ViewComponent
  ],
  imports: [
      CommonModule,
      sidebarRouter,
      FormsModule,
      LucideAngularModule.pick({ UserCircle, Users, Package, FileText, Truck, Settings, MessageCircle, Video })
  ],
  exports: [
      SidebarComponent ,
      ViewComponent
  ]
})
export class SidebarModule { }