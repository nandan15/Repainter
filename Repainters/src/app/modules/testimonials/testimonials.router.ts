import { Router,RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
const testimonialsRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'testimonials',component:TestimonialsComponent}
    ]},
];
@NgModule({
    imports: [RouterModule.forChild(testimonialsRoutes)],
    exports: [RouterModule],
})
export class testimonialsRouter{}