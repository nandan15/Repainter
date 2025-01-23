import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { PanelingComponent } from "./paneling/paneling.component";
const panelingRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'paneling',component:PanelingComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(panelingRoutes)],
    exports:[RouterModule],
})
export class panelingrouter{}