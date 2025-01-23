WallpaperComponent
import { ViewComponent } from "./view/view.component";
import { Router } from "lucide-angular";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { WallpaperComponent } from "./wallpaper/wallpaper.component";
const wallpaperRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'wallpaper',component:WallpaperComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(wallpaperRoutes)],
    exports:[RouterModule],
})
export class WallpaperRouter{}