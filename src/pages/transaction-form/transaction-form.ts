import { Component , Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { EvtProvider } from "../../providers/evt/evt";

/**
 * Generated class for the TransactionFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-transaction-form',
  templateUrl: 'transaction-form.html',
})
export class TransactionFormPage {

 	transId = "UHkTh5h6BXsatpRRa2wgNrwt";
 	customerList : any = [];
	transact:any = {productId:"",customerId:"",amt:0,description:""};
	product:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public render: Renderer2, private evt: EvtProvider, private loader: LoadingController) {
  	this.render.addClass(this.viewCtrl.pageRef().nativeElement, 'custom-popup');
  	this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    
  	this.transact.productId = this.product.id;
  	let self = this;
  	this.customerList = [];
  	let tArr = JSON.parse(localStorage.customerList);
  	Object.keys(tArr).forEach((val,ind)=>{
  		this.customerList.push(tArr[val]);
  	});

  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  save(){
  	let prodProperties = {
  			productId: this.transact.productId,
  			customerId: this.transact.customerId,
  			amount: this.transact.amt,
  		};
  	let th = {
  		name: new Date().getTime(),
  		product: this.transId,
  		properties: prodProperties,
  		description: this.transact.description,
  		identifiers:{status:"pending"}
  	}
  	let self = this;

    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: false,
      showBackdrop: true,
      content: `Saving...`,
      enableBackdropDismiss:false});
    load.present();

  	this.evt.getUserContext().then(user=>{
  		user.$init.then(usr=>{
  			usr.thng().create(th).then(res=>{
  				load.dismiss();
  			}).catch(console.info);
  			self.dismiss();
  		}).catch(console.info);
  	}).catch(console.info);
  }

  forTheBetter($event){
  	//console.log($event.target);
  	return ;
  }


}
