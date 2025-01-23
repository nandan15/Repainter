import { Route,Router, RouterModule, Routes } from "@angular/router";
import { EnquiryModule } from "./enquiry.module";
import { EnquiryComponent } from "./enquiry/enquiry.component";
import  {Component, NgModule} from "@angular/core";
import { ViewComponent } from "./view/view.component";
const enquiryRoutes:Routes=[
    {path:'',component:EnquiryComponent,children:[
        {path:'view',component:ViewComponent}
    ]}
];
@NgModule({
    imports:[RouterModule.forChild(enquiryRoutes)],
    exports:[RouterModule]
})
export class enquiryrouter{}