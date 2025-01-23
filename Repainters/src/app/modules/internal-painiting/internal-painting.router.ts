import { Routes,Router, RouterModule } from "@angular/router";
import { InternalPaintingComponent } from "./internal-painting/internal-painting.component";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
const internalpaintingRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'internalpainting',component:InternalPaintingComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(internalpaintingRoutes)],
    exports:[RouterModule]
})
export class internalpaintingrouter{}