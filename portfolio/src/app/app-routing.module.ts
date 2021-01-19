import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  { path: 'table/:table', component: ProductListComponent, pathMatch: 'full' },
  { path: 'stripe-checkout/:stripe-checkout', component: ProductListComponent, pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


