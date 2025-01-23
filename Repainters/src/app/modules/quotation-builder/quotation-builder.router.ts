import { Router, RouterModule, Routes } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { QuotationBuilderComponent } from "./quotation-builder/quotation-builder.component";
import { NgModule } from "@angular/core";
const quotationbuilderroutes: Routes = [
  { path: '',component: QuotationBuilderComponent,children: [
  { path: 'view/:customerId',component: ViewComponent},
  { path: 'view', redirectTo: '', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(quotationbuilderroutes)],
  exports: [RouterModule],
})
export class quotationbuilderrouter {}