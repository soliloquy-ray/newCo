import { Component , Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { EvtProvider } from "../../providers/evt/evt";

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
	cust:any = {"fullName":"","company":"","address":"","description":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public render: Renderer2, private evt: EvtProvider) {
  	this.render.addClass(viewCtrl.pageRef().nativeElement, 'custom-popup');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductFormPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  save(){
  	let prodProperties = {
  			"company":this.cust.company,
  			"address":this.cust.address
  		};
  	let th = {
  		product: this.custId,
  		name: this.cust.fullName,
  		properties: prodProperties,
  		description: this.cust.description
  	}
  	let self = this;
  	this.evt.getUserContext().then(user=>{
  		user.$init.then(usr=>{
  			usr.thng().create(th).then(console.log).catch(console.info);
  			self.dismiss();
  		}).catch(console.info);
  	}).catch(console.info);
  }


}
