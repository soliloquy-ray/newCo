import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, LoadingController, MenuController, Slides, AlertController, ToastController } from 'ionic-angular';

import { ProductFormPage } from "../product-form/product-form";
import { ProductPage } from "../product/product";
import { TransactionFormPage } from "../transaction-form/transaction-form";
import { TransactionListPage } from "../transaction-list/transaction-list";

import { EvtProvider } from "../../providers/evt/evt";
import { FirebaseProvider } from "../../providers/firebase/firebase";

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
	@ViewChildren(Slides, {read: ElementRef}) slideList: QueryList<Slides>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
  	private evt: EvtProvider, private loader: LoadingController, private menu: MenuController, private alert : AlertController, private toast: ToastController, private fire: FirebaseProvider) {
  }

  ngAfterViewInit() {
    console.log('ionViewDidLoad MyProductsPage');
  	this.menu.close();
  	this.initPage();
  }

  initPage(){

  	if(typeof localStorage.prodList == "undefined" || localStorage.prodList === "[]"){
  		this.fetchProductsFromEVT();
  	}else{
  		let tmpa = JSON.parse(localStorage.prodList);
  		this.productList = Object.keys(tmpa).map(a=>tmpa[a]);
  	}

  	if(typeof localStorage.customerList == "undefined" || localStorage.customerList === "[]"){
/*
	  	this.evt.getCustomerData().then(prodList =>{
	  		let custList = {};
	  		prodList.forEach((val,ind)=>{
	  			custList[val.id] = val;
	  		})

	  		Promise.resolve(custList).then(res=>{
	  			localStorage.customerList = JSON.stringify(res);	
	  		})
	  	}).catch(console.info);
	  	*/

  	this.fire.getAllUsers().then(prodList => {
  		let custList = {};
  		Object.keys(prodList).forEach((val,ind)=>{
  			if(prodList[val]['status'] == "active"){
  				custList[val] = prodList[val];
  			}
  		});

  		Promise.resolve(custList).then(res=>{
  			localStorage.customerList = JSON.stringify(custList);
  		});
  		
  	}).catch(console.info);
  	}
  }

  fetchProductsFromEVT(){
  	let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: false,
      showBackdrop: true,
      content: `Loading Data...`,
      enableBackdropDismiss:false});
    load.present();
  	this.evt.getThngData().then(prodList =>{
  		self.productList = self.clean(prodList);
  		load.dismiss();
  	}).catch(console.info);
  }

  toProductPage(prodData){
  	this.navCtrl.setRoot(ProductPage,{id:prodData.id, data:prodData},{animate: true, direction: 'forward'});
  }

  clean(prodArr:Array<any>) : Array<any>{
  	let prodList = {};
  	prodArr.forEach((val,ind)=>{
		prodList[val.id] = val;
  		val.properties.images = eval(val.properties.images);
  	});

  	Promise.resolve(prodList).then(res=>{
  		localStorage.setItem('prodList',JSON.stringify(res));
  	});
  	
  	return prodArr;
  }

  transact(prod){
    const videoModalOptions : ModalOptions = {
      showBackdrop:true,
      enableBackdropDismiss:true
    };
	console.log(prod);
    let self = this;


    let viewModal = this.modalCtrl.create(TransactionFormPage, {product : prod}, videoModalOptions);
    viewModal.onDidDismiss((val)=>{
    	console.log(val);
    	if(val){	
    	    self.navCtrl.setRoot(TransactionListPage);
    	}
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
    viewModal.onDidDismiss((val)=>{
    	if(val){
    		self.fetchProductsFromEVT();
    	}
    })
    viewModal.present();
    console.log("openModal");
  }


  elec_sld($event){
  	/*let xd : Slides = $event;
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

	*/
	return ;
  }

  deleteTrans(id:string = ''){
  	let self = this;
  	let alt = this.alert.create({
  		title: "Confirm delete",
  		message: "Are you sure you want to delete this product? This action cannot be undone.",
  		buttons: [
  			{
  				text: 'Cancel',
  				role: 'cancel'
  			},
  			{
  				text: 'Ok',
  				handler: ()=>{

				    let load = self.loader.create({
				      spinner: 'crescent',
				      dismissOnPageChange: false,
				      showBackdrop: true,
				      content: `Deleting...`,
				      enableBackdropDismiss:false});
				    load.present();
  					self.evt.deleteThng(id).then(()=>{localStorage.removeItem('prodList'); self.toastUp(); load.dismiss();});
  				}
  			}
  		]

  	});
  	alt.present();

  }

  toastUp(){
  	let self = this;
	  let toast = this.toast.create({
	    message: 'Product has been deleted',
	    duration: 3000,
	    position: 'top'
	  });

	  toast.present();
	  toast.onDidDismiss(()=>{
	  	self.initPage();
	  });
  }
}
