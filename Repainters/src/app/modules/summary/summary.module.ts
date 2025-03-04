import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { ViewComponent } from './view/view.component';
import { summaryRouter } from './summary.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SendQuoteDialogComponentComponent } from './send-quote-dialog-component/send-quote-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import{MatCheckboxModule} from'@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import{MatTooltipModule}from '@angular/material/tooltip'
import { HttpClientModule } from '@angular/common/http';
import{MatChipsModule} from '@angular/material/chips';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    SummaryComponent,
    ViewComponent,
    SendQuoteDialogComponentComponent,
  ],
  imports: [
    CommonModule,
    summaryRouter,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    HttpClientModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  exports:[
    SummaryComponent,
  
  ]
})
export class SummaryModule { }
