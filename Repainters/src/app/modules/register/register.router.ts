import { Router,RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
const registerRoutes:Routes=[
    {path:'',component:RegisterComponent,children:[
        {path:'view',component:ViewComponent}
    ]},
];
@NgModule({
    imports: [RouterModule.forChild(registerRoutes)],
    exports: [RouterModule],
})
export class registerRouter{}