import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './view/view.component';
import { registerRouter } from './register.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    registerRouter,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterModule { }
