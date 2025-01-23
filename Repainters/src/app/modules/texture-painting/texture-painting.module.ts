import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexturePaintingComponent } from './texture-painting/texture-painting.component';
import { ViewComponent } from './view/view.component';
import { texturepaintingrouter } from './texture-painting.router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TexturePaintingComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    texturepaintingrouter,
    ReactiveFormsModule
  ],
  exports:[
    TexturePaintingComponent
  ]
})
export class TexturePaintingModule { }
