import { Route, RouterModule, Routes } from "@angular/router";
import { ProductComponent } from "./product/product.component";
import { ViewComponent } from "./view/view.component";
import { Component } from "@angular/core";
import { NgModule } from "@angular/core";
const productRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'product',component:ProductComponent}
    ]},
];
@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports:[RouterModule]
})
export class productRouter{}