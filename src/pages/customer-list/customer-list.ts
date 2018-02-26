import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, LoadingController, MenuController} from 'ionic-angular';

import { CustomerFormPage } from "../customer-form/customer-form";

import { EvtProvider } from "../../providers/evt/evt";
import { FirebaseProvider } from "../../providers/firebase/firebase";

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

	customerList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
  	private evt: EvtProvider, private loader: LoadingController, private menu: MenuController, private fire: FirebaseProvider) {
  }

  ngAfterViewInit() {
  	this.fetchCustFromEVT();
  	this.menu.close();
    console.log('ionViewDidLoad CustomerListPage', this.evt);
  }

  fetchCustFromEVT(){
  	let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: false,
      showBackdrop: true,
      content: `Loading Data...`,
      enableBackdropDismiss:false});
    load.present();
  	/*this.evt.getCustomerData().then(prodList =>{
  		self.customerList = prodList;
  		console.log(self.customerList);
  		load.dismiss();
  	}).catch(console.info);*/
  	this.fire.getAllUsers().then(prodList => {
  		Object.keys(prodList).forEach((val,ind)=>{
  			if(prodList[val]['status'] == "active"){
  				self.customerList.push(prodList[val]);
  			}
  		});

  		console.log(self.customerList);
  		load.dismiss();
  	}).catch(console.info);
  }


  openModal(){
    const videoModalOptions : ModalOptions = {
      showBackdrop:true,
      enableBackdropDismiss:true,
      cssClass: "cs-modal"
    };

    const   videoData = { 'foo': 'bar' };
    let self = this;


    let viewModal = this.modalCtrl.create(CustomerFormPage, {data : videoData}, videoModalOptions);
    viewModal.onDidDismiss(bo=>{
    	if(bo){
    		self.fetchCustFromEVT();
    	}
    })
    viewModal.present();
    console.log("openModal");
  }

}
