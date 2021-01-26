import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Products} from '../models/products';
import {from, Observable, of} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {convertSnaps} from './db-utils';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    table="";
    products;

    constructor(private db: AngularFirestore) {
    }
    
    
    getProducts() {
        return this.db.collection('products', ref => ref.orderBy('category').startAt('Beers')).snapshotChanges();
    }

    getProductsBy(id) {
        return this.db.collection('products').doc(id).valueChanges();
        // return this.db.collection('products').doc(id).snapshotChanges().pipe(map(changes => {
        //     return changes.map(a => {
        //       const data = a.payload.doc.data() as Products;
        //       data.id = a.payload.doc.id;
        //       return data;
        //     })
        //   })

    }

    saveProducts(productId: string, changes: Partial<Products>): Observable<any> {
        return from(this.db.doc(`products/${productId}`).update(changes));
      }

    loadProducts(): Observable<Products[]> {
        return this.db.collection(
              'products',
                  ref => ref
              )
              .snapshotChanges()
              .pipe(
                  map(snaps => convertSnaps<Products>(snaps)),
                  first());
    }
    
}