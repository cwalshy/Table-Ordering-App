import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../services/orders.service';
import {Orders} from '../models/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders= [];

  constructor(private ordersService: OrdersService) { }
//retrieve orders from database
  ngOnInit() {
    console.log(
      this.ordersService.getOrders().subscribe(data => {
        this.orders = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as {}
          } as Orders;
        });
      }));
  }
}

