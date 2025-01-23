import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelingComponent } from './paneling/paneling.component';
import { ViewComponent } from './view/view.component';
import { panelingrouter } from './paneling-router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    PanelingComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    panelingrouter,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports:[
    PanelingComponent
  ]
})
export class PanelingModule { }
