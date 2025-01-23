import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";

import { NgModule } from "@angular/core";
import { FurnitureComponent } from "./furniture/furniture.component";

const furnitureRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'furniture',component:FurnitureComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(furnitureRoutes)],
    exports:[RouterModule],
})
export class furniturerouter{}