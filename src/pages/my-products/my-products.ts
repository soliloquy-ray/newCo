import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, LoadingController, MenuController } from 'ionic-angular';

import { ProductFormPage } from "../product-form/product-form";
import { ProductPage } from "../product/product";
import { TransactionFormPage } from "../transaction-form/transaction-form";
import { TransactionListPage } from "../transaction-list/transaction-list";

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
  	private evt: EvtProvider, private loader: LoadingController, private menu: MenuController) {
  }

  ngAfterViewInit() {
    console.log('ionViewDidLoad MyProductsPage');
  	this.menu.close();
  	this.fetchProductsFromEVT();
  }

  addProduct(){
  	this.openModal();
  }

  fetchProductsFromEVT(){
  	let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: false,
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
  	this.navCtrl.push(ProductPage,{data:prodData});
  }

  clean(prodArr:Array<any>) : Array<any>{
  	prodArr.forEach((val,ind)=>{
  		val.properties.images = eval(val.properties.images);
  	});
  	
  	console.log(prodArr);
  	return prodArr;
  }

  transact(){
    const videoModalOptions : ModalOptions = {
      showBackdrop:true,
      enableBackdropDismiss:true
    };

    const   videoData = { 'foo': 'bar' };
    let self = this;


    let viewModal = this.modalCtrl.create(TransactionFormPage, {data : videoData}, videoModalOptions);
    viewModal.onDidDismiss(()=>{
    	self.navCtrl.setRoot(TransactionListPage);
    })
    viewModal.present();
    console.log("openModal");

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
