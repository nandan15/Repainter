import { Router,RouterModule,Routes } from "@angular/router";
import { RequirementComponent } from "./requirement/requirement.component";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
const requirementRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'requirement',component:RequirementComponent}
    ]},
];
@NgModule({
    imports: [RouterModule.forChild(requirementRoutes)],
    exports: [RouterModule],
})
export class requirementRouter{}