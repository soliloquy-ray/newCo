import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
	prod : any;
	@ViewChildren(Slides, {read: ElementRef}) slideList: QueryList<Slides>;
	imageList : Array<any> = [];
	targ = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	if(navParams.get('data')){
  		this.prod = navParams.get('data');
  	}else if(typeof localStorage.prodList == "string" && localStorage.prodList != "" && localStorage.prodList != "[]" && localStorage.prodList != "{}"){
  		this.prod = JSON.parse(localStorage.prodList)[navParams.get('id')];
  	}else{
  		//fetch from EVT directly
  	}
  	this.imageList = this.prod.properties.images;
  	console.log(this.prod,this.imageList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  elec_sld($event){
  	let xd : Slides = $event;
  	if(xd.getActiveIndex() == xd.length()-1){
  		xd.lockSwipeToNext(true);
  		xd.lockSwipeToPrev(false);
  	}
  	if(xd.getActiveIndex() <= 0){
  		xd.lockSwipeToNext(false);
  		xd.lockSwipeToPrev(true);
  	}
  	if(xd.length() <= 1){
  		xd.lockSwipes(true);
  	}

  }

  toggleBG(i){
  	this.targ = i;
  }

}
