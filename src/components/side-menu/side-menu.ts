import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';
import { MyProductsPage } from '../../pages/my-products/my-products';
import { DomSanitizer} from '@angular/platform-browser';
import { EvtProvider } from '../../providers/evt/evt';

/**
 * Generated class for the SideMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent {
  links : any = [];
  constructor(private app: App, private dom: DomSanitizer, private evt: EvtProvider) {

  }

  ngOnInit(){
  	this.links = [];
  }

  ngAfterViewInit(){
  }

  myAccount(){
    let nav = this.app.getRootNav();
    nav.setRoot(ProfilePage);
  }

  whosBuyin(){
    let nav = this.app.getRootNav();
    return ;
  }

  whatsBought(){
    let nav = this.app.getRootNav();
    return ;
  }

  whatWeDo(){
    let nav = this.app.getRootNav();
    nav.setRoot(MyProductsPage);
  }

}
