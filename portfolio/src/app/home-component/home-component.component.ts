import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute) {
    
}
id;
route;
table
shoppingCart = faShoppingCart;

ngOnInit() {

  this.table = this.activatedRoute.snapshot.paramMap.get("table")
  console.log(this.table)
  this.activatedRoute.paramMap.subscribe(params => {
    this.table = params.get("table")
  })
  console.log(this.table);


  
 }
}
