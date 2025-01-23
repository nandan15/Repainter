import { Router, RouterModule, Routes } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
const sidebarRoutes: Routes = [
    {path: '',component: SidebarComponent}
];
@NgModule({
    imports:[RouterModule.forChild(sidebarRoutes)],
    exports:[RouterModule],
})
export class sidebarRouter{}