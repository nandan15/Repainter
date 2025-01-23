import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { ProcurementComponent } from "./procurement/procurement.component";
ProcurementComponent
const procurementRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'procurement',component:ProcurementComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(procurementRoutes)],
    exports:[RouterModule],
})
export class procurementrouter{}