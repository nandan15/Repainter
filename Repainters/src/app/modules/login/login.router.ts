import { Routes,Router, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { LogoutComponent } from "./logout/logout.component";
const LoginRoutes:Routes=[
    {path:'',component:LoginComponent,children:[
        {path:'view',component:ViewComponent},
        {path:'logout',component:LogoutComponent}
    ]
},
];
@NgModule({
    imports:[RouterModule.forChild(LoginRoutes)],
    exports:[RouterModule]
})
export class loginrouter{}
