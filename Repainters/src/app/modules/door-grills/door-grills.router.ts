import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { DoorGrillsComponent } from "./door-grills/door-grills.component";
const door_grillsRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'door_grills',component:DoorGrillsComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(door_grillsRoutes)],
    exports:[RouterModule],
})
export class door_grillsrouter{}