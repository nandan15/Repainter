import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelingComponent } from './paneling/paneling.component';
import { ViewComponent } from './view/view.component';
import { panelingrouter } from './paneling-router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import{MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [
    PanelingComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    panelingrouter,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
   MatRadioModule ,
   MatSelectModule,
   MatFormFieldModule
  ],
  exports:[
    PanelingComponent
  ]
})
export class PanelingModule { }
