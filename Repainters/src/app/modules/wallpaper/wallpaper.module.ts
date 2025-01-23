import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { WallpaperRouter } from './wallpaper.router';
import { WallpaperComponent } from './wallpaper/wallpaper.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewComponent,
    WallpaperComponent
  ],
  imports: [
    CommonModule,
    WallpaperRouter,
    ReactiveFormsModule
  ],
  exports:[
    WallpaperComponent
  ]
})
export class WallpaperModule { }
