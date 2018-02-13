import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, Slides, LoadingController } from 'ionic-angular';

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
  	private evt: EvtProvider, private loader: LoadingController) {
  }

  ngOnInit(){
  	this.fetchProductsFromEVT();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

  addProduct(){
  	this.openModal();
  }

  fetchProductsFromEVT(){
  	let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Loading...`,
      enableBackdropDismiss:false});
    load.present();
  	this.evt.getThngData().then(prodList =>{
  		self.productList = self.clean(prodList);
  		console.log(self.productList);
  		load.dismiss();
  	}).catch(console.info);
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
    let self = this;


    let viewModal = this.modalCtrl.create(ProductFormPage, {data : videoData}, videoModalOptions);
    viewModal.onDidDismiss(()=>{
    	self.fetchProductsFromEVT();
    })
    viewModal.present();
    console.log("openModal");
  }

}
