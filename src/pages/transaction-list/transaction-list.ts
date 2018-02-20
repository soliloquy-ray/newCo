import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, LoadingController, MenuController} from 'ionic-angular';

import { CustomerFormPage } from "../customer-form/customer-form";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
  	private evt: EvtProvider, private loader: LoadingController, private menu: MenuController) {
  }

  ngAfterViewInit() {
  	this.menu.close();
  	let self = this;
    console.log('ionViewDidLoad CustomerListPage');
    this.customerList = JSON.parse(localStorage.customerList);
    this.prodList = JSON.parse(localStorage.prodList);

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
    	})
    }).catch(console.info)
  }

}
