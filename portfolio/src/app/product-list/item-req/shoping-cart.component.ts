import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  template: `
  <h1>Shopping Cart ({{calcTotal()}})</h1>
  <cart-product *ngFor="let product of products" [product]="product" (productRemoved)="removeProduct($event)"><cart-product>
  `,
  styles: []
})
export class ShoppingCartComponent  {
  @Input() products: any[];
  @Output() productRemoved = new EventEmitter();

  cartTotal;

  isShown = false ; // hidden by default


  toggleShow() {
  this.isShown = ! this.isShown;
  }

  calcTotal() {
    this.cartTotal = this.products.reduce((acc, products) => acc += products.num , 0);
    if (this.cartTotal > 0) {
      this.isShown = true;
    }
    return this.products.reduce((acc, products) => acc += products.num , 0);
  } 

  removeProduct(product) {
    if (this.cartTotal === 0) {
      this.isShown = false;
    }
    this.productRemoved.emit(product);
  }

}
