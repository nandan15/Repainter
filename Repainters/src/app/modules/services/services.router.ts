import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { ServicesComponent } from "./services/services.component";
const servicesRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'services',component:ServicesComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(servicesRoutes)],
    exports:[RouterModule],
})
export class servicesrouter{}