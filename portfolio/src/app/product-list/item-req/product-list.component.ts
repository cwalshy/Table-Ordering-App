import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
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
  <div id="CTAFade" style="display: block;">
	<div class="callToAction fadein">
<img src='assets/img/rendezvous-hotel-perth-scarborough-pool-deck-02-2019-1500x500.jpg' class="hero-image lazyloaded">
<div class="pseudo">

</div>
</div>
</div>
  <div class='outer-main-container'>
  <div class='item'>
  <div class='item-heading'>
  <div class='category'>
  <h2>Pints</h2>
  </div>
  <div class='show-category'>
  <button (click)="showPints()" type="checkbox" >
  <h1>Show/Hide</h1>
  </button>
  </div>
  </div>
  <hr>
  <div *ngIf="pints" id='divshow'>
  <div  *ngFor="let product of products">
  <div *ngIf="product.subcategory === 'Pints'">
 
        <li class='product-list'>

        <div class='menu-container'>
          <img src='assets/img/{{product.image}}' class="prod-images lazyloaded">
        <div class="product-description">
          <div class="prod-name">{{product.name}} </div>
          <div class="prod-perc">{{product.percent}}</div>
        </div>

          <div class="price">\{{product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</div>
          <a routerLink="/addToCart/{{product.id}}" routerLinkActive="active">
          <button class="addToCart">Add To Cart</button>
          </a>
          </div>
        </li>
      </div>
    </div>
    </div>
    </div>
    <div class='item'>
    <div class='item-heading'>
    <div class='category'>
    <h2>Bottled Beer</h2>
    </div>
    <div class='show-category'>
    <button (click)="showBottled()" type="checkbox" >
    <h1>Show/Hide</h1>
    </button>
    </div>
    </div>
    <hr>
    <div *ngIf="bottled" id='divshow'>
    <div *ngFor="let product of products">
    <div *ngIf="product.subcategory === 'Bottled Beer'">
   
          <li class='product-list'>
  
          <div class='menu-container'>
            <img src='assets/img/{{product.image}}' class="prod-images lazyloaded">
          <div class="product-description">
            <div class="prod-name">{{product.name}} </div>
            <div class="prod-perc">{{product.percent}}</div>
          </div>
  
            <div class="price">\{{product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</div>
            <a routerLink="/addToCart/{{product.id}}" routerLinkActive="active">
            <button class="addToCart">Add To Cart</button>
            </a>
            </div>
          </li>
        </div>
      </div>
      </div>
      </div>
      <div class='item'>
      <div class='item-heading'>
      <div class='category'>
      <h2>Vodka</h2>
      </div>
      <div class='show-category'>
      <button (click)="showVodka()" type="checkbox" >
      <h1>Show/Hide</h1>
      </button>
      </div>
      </div>
      <hr>
      <div *ngIf="vodka" id='divshow'>
  <div *ngFor="let product of products">
  <div *ngIf="product.subcategory === 'Vodka'">
 
        <li class='product-list'>

        <div class='menu-container'>
          <img src='assets/img/{{product.image}}' class="prod-images lazyloaded">
        <div class="product-description">
          <div class="prod-name">{{product.name}} </div>
          <div class="prod-perc">{{product.percent}}</div>
        </div>

          <div class="price">\{{product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</div>
          <a routerLink="/addToCart/{{product.id}}" routerLinkActive="active">
          <button class="addToCart">Add To Cart</button>
          </a>
          </div>
        </li>
      </div>
    </div>
    </div>
  
  `,
  styleUrls: ['./products.css'],
  styles: [`  
  .show-category > button > h1 {
    font-size: 18px;
  }
  .item-heading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
}

  .show-category {
    justify-self: right;
    margin-right: 10%;
  }
  .product-list {
    list-style: none;  
    background: #f0f0f0;
    list-style: none;
    padding: 0 .3% .3% .3%;
    margin: .15%;
    border-radius: 10px;
  }
  .subcat {
    padding: 1.5%;
  } 
  .outer-main-container {
    padding: 1.5%;
    background: #f0f0f0;
    padding-bottom: 15%;

  }

  .items-container {
    background-color: #444444;
    padding: 1.75% 0 0 1.75%;
    font-size: 14px;
    color: white;
    font-weight: 200;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

  } 
  .items-container > h1 {
    font-weight: 500;
    padding-bottom: 3%;
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
    background: transparent;
    border: none;
    cursor: pointer;
    width: 100px;
  }
 `]
})
export class ProductListComponent implements OnInit  {


  processingOngoing = false;
  products: Products[];

id;
route;
table
stripe;
datas;
cartProductList = [];
productExistInCart;
vodka: boolean = false;
bottled: boolean = false;
pints: boolean = false; 
hidden = '+'



constructor(private elementRef:ElementRef, private activatedRoute: ActivatedRoute, private tableNumber: ProductService, private storageService: StorageService,   private productService: ProductService) {
  

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

showVodka() {
  this.vodka = ! this.vodka;
  if(this.hidden == '+') {
  this.hidden = '-'
  }
  else {
  this.hidden = '+'
  }

}
showPints() {
  this.pints = ! this.pints;
  if(this.hidden == '+') {
  this.hidden = '-'
  }
  else {
  this.hidden = '+'
  }

}
showBottled() {
  this.bottled = ! this.bottled;
  if(this.hidden == '+') {
  this.hidden = '-'
  }
  else {
  this.hidden = '+'
  }

}


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