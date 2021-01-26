import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StorageService} from '../../services/storage-service';
import {ProductService} from '../../services/products.service';
// import {ProductPopupComponent} from '../../product-popup/product-popup.component';
import {Products} from '../../models/products';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { ToastrService } from 'ngx-toastr';      

import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'product',
  template: `

  
<div  *ngFor="let product of products">
  <div class="item-container" *ngIf="product.id == productId">
    <div class="item-image">
        <img src='assets/img/{{product.image}}' class="item-images lazyloaded">
    </div>
<hr>
    <div class="item-name">
    {{product.name}} 
    </div>

    <div class="item-price">\{{product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</div>

    <div class="item-quantity">

    <div class='plus-minus'>

    <a (click)="minus()" mat-icon-button color="primary" aria-label="">
    <mat-icon>remove_circle_outline</mat-icon>
    </a>
    </div>

    <div>
    {{quantity}}
    </div>

    <div class='plus-minus'>
    <a class='plus-minus' (click)="add()" mat-icon-button color="primary" aria-label="">
    <mat-icon>add_circle_outline</mat-icon>
    </a>
    </div>
    </div>
    <div class="item-button">
    <button class="addToCart" (click)="addToCart(product.name, product.price, product.id, quantity)">{{buttonContent}}</button>
    <div> 

  
    </div>
  `,
  styleUrls: ['./products.css'],
  styles: [`
  .plus-minus {

  }
  .item-quantity {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .item-container > div {
    padding: 2.5% 0;
  }
  .item-image {
    background: white;
    margin: 5% 0;
  }
  .item-images {
    background: white;
    width: 50%;
    height: 100%;
    text-align: center;
    margin: 0 auto;
  }
  .item-quantity {
    border: 2px solid;
    border-radius: 50px;
    background: whitesmoke;
    align-items: center;
  }
  .item-container {
    display: grid;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    font-size: 22px;
  }
  .menu-container {
    display: grid;
    grid-template-columns: .25fr 2.5fr 0.15fr .25fr;
    align-items: center;
    grid-column-gap: 10px;
    justify-items: self-start;
    background: white;
  }
  
.menu-container {
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

  button {
    background: white;
    border: none;
    cursor: pointer;
    font-size: 32px;
  }
  `]
})

export class ProductComponent  {


  cartProductList = [];
  productExistInCart;
  datas;
  productId;
  itemCollection;
  item;
  products: Products[];
  quantity = 1;
  buttonContent = 'Add To Cart'
  
  constructor(private toastr: ToastrService, private db: AngularFirestore, private activatedRoute: ActivatedRoute, private productService: ProductService, public dialog: MatDialog, private storageService: StorageService
    )  {

    }


  
  ngOnInit() {




    this.productId = this.activatedRoute.snapshot.paramMap.get("id")
    console.log(this.productId)
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get("id")
    this.productId.toLocaleString();
    })



    this.productService.getProducts().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Products;
      });
    });

    
   }
   successmsg(item, quantity){  
    this.toastr.success( `${quantity} x ${item}  added to cart`, 'Success')  
}  
alertmsg(item){  
  this.toastr.error( `${item}  removed from cart`, 'Success')  
}  
  loadProducts() {
    this.item = this.productService.getProductsBy(this.productId);    
    this.item.subscribe((item) =>{
      this.item = item;
      return this.item;
    })


   }
   add() {
    this.buttonContent = 'Add To Cart'
    this.quantity ++;

   }
   minus() {

    if(this.quantity > 0) {

        this.quantity --;
  
      } else {

  }
  if (this.quantity < 1) {

    this.buttonContent = 'Remove From Cart';

  }
}
  // add to cart
  addToCart(itemName, price, id, quantity) {

    if(this.quantity == 0) {

      let name = itemName;
      
      this.datas = this.storageService.getStorage('data');

      this.productExistInCart = this.datas.findIndex(({itemName}) => itemName === name); 

      console.log(this.productExistInCart);

      if (this.productExistInCart > -1) {
        this.datas.splice(this.productExistInCart, 1);
        this.storageService.store('data', this.datas);
        this.alertmsg(itemName);
      }
    } else {


    //store local storage in datas variable
    
    this.datas = this.storageService.getStorage('data');

    //if datas is not empty search data for item
    if (this.datas != null) {
  
      let name = itemName;

//    index of item in cart 
      this.productExistInCart = this.datas.findIndex(({itemName}) => itemName === name); 

      if(this.productExistInCart !< 0) {
  
        this.datas.push({itemName, price, id, quantity}); 


        this.storageService.store('data', this.datas);
        } else {
          console.log(this.quantity);

        this.datas[this.productExistInCart].quantity = this.quantity;
        this.storageService.store('data', this.datas);
        this.successmsg(itemName, quantity);

        // localStorage.setItem('data', JSON.stringify(this.datas));
      return;
      }
      this.successmsg(itemName, quantity);

    }
    else {


      // this.datas = JSON.parse(localStorage.getItem('data'));
  
      this.cartProductList.push({itemName, price, id, quantity}); // enhance "product" object with "num" property)
  
  
      // localStorage.setItem('data', JSON.stringify(this.cartProductList));
      this.storageService.store('data', this.cartProductList);
      // const name = itemName;
      
      // this.productExistInCart = this.datas.findIndex(({itemName}) => itemName === name); // find product by name
    
      // console.log(this.productExistInCart);
        this.successmsg(itemName, quantity);

      this.datas[this.productExistInCart].quantity == quantity;

      return;
      }
    }
  }
}
