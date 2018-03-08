import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';

import {keys} from "../../config/keys"

/**
 * Generated class for the NeuralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-neural',
  templateUrl: 'neural.html',
})
export class NeuralPage {
	overlay: any;
	orig: any;
	cloudName: string = keys.cloudinary.cloudName;
	url: string = `https://res.cloudinary.com/${this.cloudName}/image/upload/w_800,h_800,c_fill/`;
	art: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
  	console.log(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NeuralPage',this);
  }

  ngAfterViewInit(){
  	console.log(this);
  	//this.art = {"url":"https://res.cloudinary.com/demo/image/upload/w_700,h_700,c_fill/e_style_transfer,l_sailing_angel/golden_gate.jpg"};
  }

  fn(response){
    this.overlay = response;
    this.overlay['public_id'] = response.public_id;
    localStorage.overlayImg = JSON.stringify(this.overlay);
    console.log(this.overlay, typeof this.overlay, typeof response, this);
  }

  art_transfer(response){
  	let self = this;
  	this.orig = response;
    this.orig['public_id'] = response.public_id;
    let overly = JSON.parse(localStorage.overlayImg);
  	console.log(self, overly, typeof overly, overly.public_id);
  	new Promise((resolve,reject)=>{
  		console.log(this.orig);
  		resolve(this.orig);
  	}).then(res=>{
  		let comp = self.url + `e_style_transfer,l_${overly['public_id']}.${overly['format']}/${res['public_id']}.${res['format']}`;
  		console.log(res,comp,self,this);
  		self.http.get(comp).toPromise().then(res=>{
  			console.log(res);
  			self.art = res;
  		}).catch(console.info);
  	}).catch(console.info);

  }

}
