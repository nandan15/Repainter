import { RouterModule,Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { NgModule } from "@angular/core";
import { NoteComponent } from "./note/note.component";

const noteRoutes:Routes=[
    {path:'',component:ViewComponent,children:[
        {path:'note',component:NoteComponent}
    ]},
];
@NgModule({
    imports:[RouterModule.forChild(noteRoutes)],
    exports:[RouterModule],
})
export class noterouter{}