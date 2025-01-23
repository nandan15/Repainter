import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { TexturePaintingComponent } from "./texture-painting/texture-painting.component";
import { NgModule } from "@angular/core";
const TexturePaintingRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'texture-painting',component:TexturePaintingComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(TexturePaintingRoutes)],
    exports:[RouterModule],
})
export class texturepaintingrouter{}