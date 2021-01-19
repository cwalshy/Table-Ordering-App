import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Products} from '../../models/products';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductService} from '../../services/products.service';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  selector: 'app-product-list',
  template: `
  <li style='list-style: none'>
  {{table}}
  <product *ngFor="let product of products" [product]="product" (productAdded)="addProductToCart($event)"></product></li>
  `,
  styles: []
})
export class ProductListComponent implements OnInit  {

  products$: Observable<Products[]>;

  processingOngoing = false;
  products: Products[];

  constructor(
    private productService: ProductService) {
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
    
  }
  
}
