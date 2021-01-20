import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Products} from '../../models/products';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductService} from '../../services/products.service';
import {CheckoutService} from '../../services/checkout.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service';

@Component({
  selector: 'app-product-list',
  template: `
  <li style='list-style: none;  
  background: #f5f5f5;
  list-style: none;
  padding: 3%;'>
  <product *ngFor="let product of products" [product]="product" (productAdded)="addProductToCart($event)"></product></li>
  `,
  styles: [`    
 `]
})
export class ProductListComponent implements OnInit  {

  products$: Observable<Products[]>;

  processingOngoing = false;
  products: Products[];

id;
route;
table
stripe;
datas;


constructor( private activatedRoute: ActivatedRoute, private tableNumber: ProductService, private storageService: StorageService,   private productService: ProductService) {
  

}
// load products from firestore via service
ngOnInit() {
  console.log(
  this.productService.getProducts().subscribe(data => {
    this.products = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data() as {}
      } as Products;
    });
  }));
  

  //load table number from url
  this.table = this.activatedRoute.snapshot.paramMap.get("table")
  console.log(this.table)
  this.activatedRoute.paramMap.subscribe(params => {
    this.table = params.get("table")
  })
  //load stripe checkout url
  this.stripe = this.activatedRoute.snapshot.paramMap.get("stripe-checkout")
  console.log(this.stripe)
  this.activatedRoute.paramMap.subscribe(params => {
    this.stripe = params.get("stripe-checkout")
  })
  //pass table number into service to store
  this.tableNumber.table=this.table;
  this.storageService.store('table', this.table);

  this.clearCart();


}
// clear cart if stripe checjout success
clearCart() {
  if(this.stripe == 'success') {
    this.storageService.store('data', 0);
    this.storageService.clear('data');
  }
}
}