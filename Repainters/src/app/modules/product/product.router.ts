import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ViewComponent } from './view/view.component';
import { CategoryviewComponent } from './categoryview/categoryview.component';

const productRoutes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: ViewComponent },
      { path: 'product', component: ProductComponent },
      { path: 'customerview/:categoryId', component: CategoryviewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }