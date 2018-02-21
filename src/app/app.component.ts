import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyProductsPage } from '../pages/my-products/my-products';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MyProductsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  menuOpened(){
    try{
      this.menu.swipeEnable(false);
    }
    catch(error){
      this.menu.swipeEnable(false);
    }


  }
  
  menuClosed(){
    try{
        this.menu.swipeEnable(true);
    }
    catch(error){
        this.menu.swipeEnable(true);
    }


  }
}

