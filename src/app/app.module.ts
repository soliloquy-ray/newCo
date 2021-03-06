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
import { VisionPage } from '../pages/vision/vision';
import { OcrPage } from '../pages/ocr/ocr';
import { NeuralPage } from '../pages/neural/neural';
import { ClarifaiPage } from '../pages/clarifai/clarifai';
import { ImaggaPage } from '../pages/imagga/imagga';
import { AylienPage } from '../pages/aylien/aylien';
import { ViewFirePage } from '../pages/view-fire/view-fire';

import { EvtProvider } from '../providers/evt/evt';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { OfflineDbProvider } from '../providers/offline-db/offline-db';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
            VisionPage,
            OcrPage,
            NeuralPage,
            ClarifaiPage,
            ImaggaPage,
            AylienPage,
            ViewFirePage
          ];

@NgModule({
  declarations: pages,
  imports: [
    ComponentsModule,
    DirectivesModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{}, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: MyProductsPage, name: 'MyProductsPage', segment: 'products' },
        { component: ProductPage, name: 'ProductPage', segment: 'product/:id' },
        { component: CustomerListPage, name: 'CustomerListPage', segment: 'customers' },
        { component: TransactionListPage, name: 'TransactionListPage', segment: 'transactions' },
        { component: VisionPage, name: 'VisionPage', segment: 'vision' },
        { component: OcrPage, name: 'OcrPage', segment: 'ocr' },
        { component: NeuralPage, name: 'NeuralPage', segment: 'artwork' },
        { component: ClarifaiPage, name: 'ClarifaiPage', segment: 'clarifai' },
        { component: ImaggaPage, name: 'ImaggaPage', segment: 'imagga' },
        { component: AylienPage, name: 'AylienPage', segment: 'aylien' },
        { component: ViewFirePage, name: 'ViewFirePage', segment: 'gallery' },
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: pages,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    EvtProvider,
    FirebaseProvider,
    OfflineDbProvider
  ]
})
export class AppModule {}
