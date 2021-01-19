import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StorageService} from '../../services/storage-service';
import {ProductService} from '../../services/products.service';
// import {ProductPopupComponent} from '../../product-popup/product-popup.component';
import {Products} from '../../models/products';

@Component({
  selector: 'product',
  template: `
  <img src='assets/img/{{product.image}}' class="prod-images lazyloaded">
  <button class="addToCart" (click)="addToCart(product.name, product.price, product.id, 1)">Add To Cart</button>

  <div class="product-description">
  <div class="prod-name">{{product.name}} <span class="prod-perc">{{product.percent}}</span></div>
  <div class="prod-desc">{{product.description}}</div>

  <div class="price">\{{product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</div>

  </div>

  `,
  styleUrls: ['./products.css'],
  styles: [`
  :host {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: self-end;
    grid-column-gap: 10px;
    justify-items: center;
  }
  
:host {
  margin: 1em;
  padding: 1em;
  -webkit-box-shadow: 6px 6px 6px -5px rgba(77,77,77,1);
  -moz-box-shadow: 6px 6px 6px -5px rgba(77,77,77,1);
  box-shadow: 6px 6px 6px -5px rgba(77,77,77,1);
  border-radius: 7px;
}
  .prod-name {
    font-weight: bold;
  }

  .product-description {
    grid-template-rows: 1fr 1fr;
  }
  .prod-desc {
    padding-top: .75%;
    font-style: italic;
    font-weight: 400;
    }
  .price {
    padding-top: .75%;
    font-weight: 400;
    align-self: center;
  }
  .add-button {
    background: transparent;
    border: none;
    font-size: 2em;
    font-weight: 700;
    align-self: center
  }
  button {
    background: white;
    border: none;
    cursor: pointer;
    width: 100px;
  }
  `]
})

export class ProductComponent  {


  cartProductList = [];
  productExistInCart;
  datas;
  
  constructor(private tableNumber: ProductService, public dialog: MatDialog, private storageService: StorageService)  {

  }

  @Input() product: any;


  // add to cart
  addToCart(itemName, price, id, quantity) {
    //store local storage in datas variable
    
    this.datas = this.storageService.getStorage('data');

    //if datas is not empty search data for item
    if (this.datas != null) {
  
      let name = itemName;

      console.log('if statement', this.datas);
//    index of item in cart 
      this.productExistInCart = this.datas.findIndex(({itemName}) => itemName === name); // find product by name

        console.log(this.productExistInCart);
  
      if(this.productExistInCart !< 0) {
  
        this.datas.push({itemName, price, id, quantity}); // enhance "product" object with "num" property)

        this.storageService.store('data', this.datas);

        // localStorage.setItem('data', JSON.stringify(this.datas));
  
        console.log('this is the data', this.datas);  
      } else {
  
        console.log(this.datas[this.productExistInCart]);
        console.log(quantity);
        this.datas[this.productExistInCart].quantity = this.datas[this.productExistInCart].quantity + quantity;
        this.storageService.store('data', this.datas);

        // localStorage.setItem('data', JSON.stringify(this.datas));
  

      return;
      }
    }
    else {
  
      
      // this.datas = JSON.parse(localStorage.getItem('data'));
      console.log('this is the first contents of', this.datas);
  
      this.cartProductList.push({itemName, price, id, quantity}); // enhance "product" object with "num" property)
  
  
      // localStorage.setItem('data', JSON.stringify(this.cartProductList));
      this.storageService.store('data', this.cartProductList);
      console.log(this.cartProductList);
      // const name = itemName;
      
      // this.productExistInCart = this.datas.findIndex(({itemName}) => itemName === name); // find product by name
    
      // console.log(this.productExistInCart);
  
      // this.datas[this.productExistInCart].quantity == quantity;
      return;
    }
  
  }
}
