import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

/* pages */
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { MyProductsPage } from '../pages/my-products/my-products';
import { ProductPage } from '../pages/product/product';
import { ProductFormPage } from '../pages/product-form/product-form';
import { CustomerFormPage } from '../pages/customer-form/customer-form';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { TransactionFormPage } from '../pages/transaction-form/transaction-form';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';


import { EvtProvider } from '../providers/evt/evt';

import { HttpModule } from '@angular/http';
import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';

const pages = [
            MyApp,
            HomePage,
            ProfilePage,
            MyProductsPage,
            ProductFormPage,
            ProductPage,
            CustomerFormPage,
            CustomerListPage,
            TransactionFormPage,
            TransactionListPage,
          ];

@NgModule({
  declarations: pages,
  imports: [
    ComponentsModule,
    DirectivesModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{}, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: MyProductsPage, name: 'MyProductsPage', segment: 'products' },
        { component: ProductPage, name: 'ProductPage', segment: 'product/:id' },
        { component: CustomerListPage, name: 'CustomerListPage', segment: 'customers' },
        { component: TransactionListPage, name: 'TransactionListPage', segment: 'transactions' },
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: pages,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EvtProvider
  ]
})
export class AppModule {}
