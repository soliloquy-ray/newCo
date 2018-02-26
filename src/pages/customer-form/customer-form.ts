import { Component , Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { EvtProvider } from "../../providers/evt/evt";
import { FirebaseProvider } from "../../providers/firebase/firebase";

/**
 * Generated class for the ProductFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-customer-form',
  templateUrl: 'customer-form.html',
})
export class CustomerFormPage {

 	custId = "U4kTBncPeDswtKaaRFNE8dmk";
	cust:any = {"fullName":"","company":"","address":"","description":"","email":"","mobile":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public render: Renderer2, private evt: EvtProvider, private fire: FirebaseProvider) {
  	this.render.addClass(viewCtrl.pageRef().nativeElement, 'custom-popup');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductFormPage');
    console.log(this.evt);
  }

  dismiss(bo: boolean = false) {
    this.viewCtrl.dismiss(bo);
  }

  save(){
  	/*let prodProperties = {
  			"company":this.cust.company,
  			"address":this.cust.address
  		};
  	let th = {
  		product: this.custId,
  		name: this.cust.fullName,
  		properties: prodProperties,
  		description: this.cust.description,
  		tags: ['active']
  	}*/
  	let th = {
  		name: this.cust.fullName,
  		company:this.cust.company,
  		address:this.cust.address,
  		description: this.cust.description,
  		email: this.cust.email,
  		mobile: this.cust.mobile,
  		status: 'active'
  	}
  	let self = this;
  	self.fire.createUser(th).then(res=>{
  		self.dismiss(true);
  		localStorage.removeItem('customerList');
  	}).catch(console.info);

  	/*this.evt.getUserContext().then(user=>{
  		user.$init.then(usr=>{
  			usr.thng().create(th).then(localStorage.removeItem('customerList')).catch(console.info);
  			self.dismiss();
  		}).catch(console.info);
  	}).catch(console.info);*/
  }


}
