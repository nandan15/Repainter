// customer-router.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerViewComponent } from "./view/view.component";
import { ViewComponent } from "../sidebar/view/view.component";

const customerRoutes: Routes = [
  {path: '',component: CustomerComponent,children: [
      {path: 'view',component: CustomerViewComponent, children: [
      { path: '', component: ViewComponent }
      
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRouter {}