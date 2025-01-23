import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { QuotationBuilderComponent } from './quotation-builder/quotation-builder.component';
import { ViewComponent } from './view/view.component';
import { quotationbuilderrouter } from './quotation-builder.router';
import { MatTabsModule } from '@angular/material/tabs';
import { InternalPaintingModule } from '../internal-painiting/internal-painting.module';
import { RequiremetnModule } from '../requirement/requiremetn.module';
import { TexturePaintingModule } from '../texture-painting/texture-painting.module';
import { PanelingModule } from '../paneling/paneling.module';
import { CurtainsModule } from "../curtains/curtains.module";
import { FurnitureModule } from "../furniture/furniture.module";
import { ServicesModule } from "../services/services.module";
import { DoorGrillsModule } from "../door-grills/door-grills.module";
import { NoteModule } from "../note/note.module";
import { WallpaperModule } from '../wallpaper/wallpaper.module';
import { PackageModule } from '../package/package.module';
import { SummaryModule } from "../summary/summary.module";
import { FormStateService } from 'src/app/Shared/generate/form-state.service';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    QuotationBuilderComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    quotationbuilderrouter,
    ReactiveFormsModule,
    MatTabsModule,
    InternalPaintingModule,
    RequiremetnModule,
    TexturePaintingModule,
    FormsModule,
    WallpaperModule,
    PanelingModule,
    CurtainsModule,
    FurnitureModule,
    ServicesModule,
    DoorGrillsModule,
    NoteModule,
    PackageModule,
    SummaryModule,
    MatButtonModule
],
providers:[
  FormStateService
]
})
export class QuotationBuilderModule { }
