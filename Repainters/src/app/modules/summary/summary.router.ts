import { Router,RouterModule,Routes } from "@angular/router";
import { SummaryComponent } from "./summary/summary.component";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
const summaryRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'summary',component:SummaryComponent}
    ]},
];
@NgModule({
    imports: [RouterModule.forChild(summaryRoutes)],
    exports: [RouterModule],
})
export class summaryRouter{}