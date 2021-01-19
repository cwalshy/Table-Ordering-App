import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemReqComponent } from './product-list/item-req/item-req.component';
import {MatButtonModule} from '@angular/material/button';

import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProductListComponent} from './product-list/item-req/product-list.component';
import {ShoppingCartComponent} from './product-list/item-req/shoping-cart.component';
import {ProductComponent} from './product-list/item-req/product.component';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  FacebookLoginProvider,
} from 'angularx-social-login';

import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { StorageService } from './services/storage-service';
import { HomeComponentComponent } from './home-component/home-component.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';

const config = {
  apiKey: 'AIzaSyB6pf44F08q11QqCVYnZp4nlt7yjH4PaAs',
  authDomain: 'coffeeapp-118b2.firebaseapp.com',
  databaseURL: 'https://coffeeapp-118b2.firebaseio.com',
  projectId: 'coffeeapp-118b2',
  storageBucket: 'coffeeapp-118b2.appspot.com',
  messagingSenderId: '296435086287'
};

@NgModule({
  declarations: [
    AppComponent,
    ItemReqComponent,
    ProductComponent,
    ProductListComponent,
    ProductCartComponent,
    OrdersComponent,
    ShoppingCartComponent,
    HomeComponentComponent,
    CustomerOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    AngularFireFunctionsModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    SocialLoginModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule

  ],
  providers: [
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
