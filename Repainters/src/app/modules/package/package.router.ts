import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { PackageComponent } from "./package/package.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
const packageRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'package',component:PackageComponent},
        {path:'dashboard',component:DashboardComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(packageRoutes)],
    exports:[RouterModule],
})
export class packagerouter{}