import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, AlertController, ToastController} from 'ionic-angular';

import { ProductPage } from "../product/product";

import { EvtProvider } from "../../providers/evt/evt";

/**
 * Generated class for the TransactionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
})
export class TransactionListPage {

	transactions: any = [];
	customerList: any = [];
	prodList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private evt: EvtProvider, private loader: LoadingController, private menu: MenuController, private alert: AlertController, private toast:ToastController) {
  }

  ngAfterViewInit() {
  	this.menu.close();
    console.log('ionViewDidLoad CustomerListPage');
    this.customerList = JSON.parse(localStorage.customerList);
    this.prodList = JSON.parse(localStorage.prodList);
    this.initTrans();
  }

  initTrans(){
  	let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: false,
      showBackdrop: true,
      content: `Loading Data...`,
      enableBackdropDismiss:false});
    load.present();

    this.evt.getTransData().then(res=>{
    	load.dismiss();
    	this.transactions = res;
    	this.transactions.forEach((val,ind)=>{
    		//console.log(self.transactions[ind].properties.productid,self.prodList);
    		self.transactions[ind].productName = self.prodList[self.transactions[ind].properties.productid].name;
    		self.transactions[ind].customerName = self.customerList[self.transactions[ind].properties.customerid].name;
    		self.transactions[ind].productImg = self.prodList[self.transactions[ind].properties.productid].properties.images[0];
    		self.transactions[ind].totalCost = self.prodList[self.transactions[ind].properties.productid].properties.price * self.transactions[ind].properties.amount;
    		if(self.transactions[ind].properties.status == "paid"){
    			self.transactions[ind].updDate = new Date(self.transactions[ind].properties.paidat).toDateString();
    		}
    		console.log(self.transactions);
    	})
    }).catch(console.info)
  }

  viewProduct(id:string=''){
  	this.navCtrl.setRoot(ProductPage,{id:id},{animate:true,direction:"right"});
  }

  showConfirm(id){
  	console.log(id);
  	let self = this;
  	let alt = this.alert.create({
  		title: "Confirm payment",
  		message: "Ready to complete this transaction?",
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
				      content: `Processing...`,
				      enableBackdropDismiss:false});
				    load.present();
  					self.evt.completeTransaction(id)
  							.then(()=>{self.toastUp();load.dismiss();})
  							.catch(()=>{load.dismiss()});
  				}
  			}
  		]

  	});
  	alt.present();
  }

  toastUp(del : boolean = false){
  	let self = this;
  	let msg = 'Transaction completed successfully';
  	if(del){
  		msg = 'Transaction has been deleted.';
  	}
	  let toast = this.toast.create({
	    message: msg,
	    duration: 1500,
	    position: 'top'
	  });

	  toast.present();
	  toast.onDidDismiss((val)=>{
	  	self.initTrans();
	  });
  }

  deleteTrans(id:string = ''){
  	let self = this;
  	let alt = this.alert.create({
  		title: "Confirm delete",
  		message: "Are you sure you want to delete this transaction? This action cannot be undone.",
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
				      content: `Processing...`,
				      enableBackdropDismiss:false});
				    load.present();
  					self.evt.deleteThng(id)
  							.then(()=>{self.toastUp(true);load.dismiss();})
  							.catch(()=>{load.dismiss()});
  				}
  			}
  		]

  	});
  	alt.present();

  }

}
