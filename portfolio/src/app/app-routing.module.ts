import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductListComponent } from './product-list/item-req/product-list.component';


const routes: Routes = [
  { path: 'products/table/:table', component: ProductListComponent },
  { path: 'stripe-checkout/:stripe-checkout', component: OrdersComponent, pathMatch: 'full' },
  { path: 'cart',  pathMatch: 'full', component: ProductCartComponent },
  { path: 'orders',  pathMatch: 'full', component: OrdersComponent },
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


