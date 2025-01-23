import { Routes,Router, RouterModule } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { VideoComponent } from "./video/video.component";
import { ProjectComponent } from "./project/project.component";
import { ProductsComponent } from "./products/products.component";
import { NgModule } from "@angular/core";
const videoRoutes:Routes=[
    {path:'',component:VideoComponent,children:[
        {path:'view',component:ViewComponent},
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(videoRoutes)],
    exports:[RouterModule],
})
export class videoRouter{}
