import { Component } from "lucide-angular";
import { AdditionalsComponent } from "./additionals/additionals.component";
import { ViewComponent } from "./view/view.component";
import { Routes,Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
const AdditionalRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'additional',component:AdditionalsComponent}
]},
];
@NgModule({
    imports: [RouterModule.forChild(AdditionalRoutes)],
    exports: [RouterModule],
})
export class AdditionalRouter{}