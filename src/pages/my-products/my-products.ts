import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';

import { ProductFormPage } from "../product-form/product-form"

import { EvtProvider } from "../../providers/evt/evt";

/**
 * Generated class for the MyProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {

	productList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
  	private evt: EvtProvider) {
  }

  ngOnInit(){
  	let self = this;
  	this.evt.getThngData().then(prodList =>{
  		self.productList = self.clean(prodList);
  		console.log(self.productList);
  	}).catch(console.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

  addProduct(){
  	this.openModal();
  }

  toProductPage(prodData){
  	//this.navCtrl.push(ProductPage,{data:prodData});
  }

  clean(prodArr:Array<any>) : Array<any>{
  	prodArr.forEach((val,ind)=>{
  		val.properties.images = eval(val.properties.images);
  	});
  	
  	console.log(prodArr);
  	return prodArr;
  }


  openModal(){
    const videoModalOptions : ModalOptions = {
      showBackdrop:true,
      enableBackdropDismiss:true
    };

    const   videoData = { 'foo': 'bar' };


    let viewModal = this.modalCtrl.create(ProductFormPage, {data : videoData}, videoModalOptions);
    viewModal.present();
    console.log("openModal");
  }

}
