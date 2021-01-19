import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Orders} from '../models/orders';
import {from, Observable, of} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {convertSnaps} from './db-utils';
import OrderByDirection = firebase.firestore.OrderByDirection;
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
    providedIn: 'root'
  })
  export class OrdersService {

    constructor(private db: AngularFirestore) {
    }
    
    getOrders() {
        return this.db.collection('orders').snapshotChanges();
    }

    loadOrders(): Observable<Orders[]> {
        return this.db.collection(
              'orders',
                  ref => ref
              )
              .snapshotChanges()
              .pipe(
                  map(snaps => convertSnaps<Orders>(snaps)),
                  first());
    }
}