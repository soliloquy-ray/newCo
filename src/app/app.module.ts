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
import { ProductFormPage } from '../pages/product-form/product-form';


import { EvtProvider } from '../providers/evt/evt';

import { HttpModule } from '@angular/http';
import { ComponentsModule } from '../components/components.module';

const pages = [
            MyApp,
            HomePage,
            ProfilePage,
            MyProductsPage,
            ProductFormPage
          ];

@NgModule({
  declarations: pages,
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{}, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: MyProductsPage, name: 'MyProductsPage', segment: 'products' },
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
