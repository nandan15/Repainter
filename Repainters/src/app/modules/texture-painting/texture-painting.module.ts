import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexturePaintingComponent } from './texture-painting/texture-painting.component';
import { ViewComponent } from './view/view.component';
import { texturepaintingrouter } from './texture-painting.router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    TexturePaintingComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    texturepaintingrouter,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000
    })
  ],
  exports:[
    TexturePaintingComponent
  ]
})
export class TexturePaintingModule { }
