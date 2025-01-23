import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { ViewComponent } from './view/view.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { ProductsComponent } from './products/products.component';
import { CustomerComponent } from './customer/customer.component';
import { GeneralComponent } from './general/general.component';
import { videoRouter } from './video.router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import{MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    VideoComponent,
    ViewComponent,
    AboutComponent,
    ProjectComponent,
    ProductsComponent,
    CustomerComponent,
    GeneralComponent
   
  ],
  imports: [
    CommonModule,
    videoRouter,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule
  ],
  
})
export class VideoModule { }
