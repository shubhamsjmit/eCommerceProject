import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanDeactivate } from '@angular/router';
import { AddProductGuard } from './add-product.guard';

const routes: Routes = [
  {
    path:"addProduct", component: AddProductsComponent, canDeactivate: [AddProductGuard]
  },
  {
    path:"productList", component: ProductListComponent
  },
  {
    path:"productList/:id", component: AddProductsComponent
  },
  {
    path:"", redirectTo: "/addProduct", pathMatch:'full'
  },
  {
    path:"**", redirectTo: "/addProduct"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
