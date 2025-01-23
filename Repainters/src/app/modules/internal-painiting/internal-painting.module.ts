import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { internalpaintingrouter } from './internal-painting.router';
import { InternalPaintingComponent } from './internal-painting/internal-painting.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ViewComponent,
    InternalPaintingComponent
  ],
  imports: [
    CommonModule,
    internalpaintingrouter,
    MatTabsModule
  ],
  exports:[
    ViewComponent,
    InternalPaintingComponent
  ]
})
export class InternalPaintingModule { }
