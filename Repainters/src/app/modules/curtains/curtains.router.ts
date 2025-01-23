import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";

import { NgModule } from "@angular/core";
import { CurtainsComponent } from "./curtains/curtains.component";

const curtainsRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'curtains',component:CurtainsComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(curtainsRoutes)],
    exports:[RouterModule],
})
export class curtainsrouter{}