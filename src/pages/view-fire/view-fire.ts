import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from "../../providers/firebase/firebase";

/**
 * Generated class for the ViewFirePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-fire',
  templateUrl: 'view-fire.html',
})
export class ViewFirePage {

	list : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseProvider) {
    let self = this;
    fire.getAllImages().then(res=>{
    	for(var propt in res){
    		if(res.hasOwnProperty(propt)){
    			self.list.push(res[propt]);
    		}
    	}
    	localStorage.setItem('gallery',JSON.stringify(res));
    })
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ViewFirePage');
  }

}
