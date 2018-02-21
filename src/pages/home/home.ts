import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MyProductsPage } from "../my-products/my-products";

import { EvtProvider } from "../../providers/evt/evt";

import * as Quill from "quill";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ql: any;
  constructor(public navCtrl: NavController, private evt: EvtProvider) {
    console.log(Quill);
  }

  ionViewWillEnter(){
    this.navCtrl.setRoot(MyProductsPage);
  }

  ngOnInit(){
  	this.evt.evtApp.login({email:"test@gmail.com",password:"pass1234"}).then(response=>{
  		console.log(response.user);
  	})
    this.ql = new Quill('.quill-container', {
       modules: {
         toolbar: [
           [
             { header: [1, 2, false] } 
           ],
           ['bold', 'italic', 'underline'],
           ['image', 'code-block']
         ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'  // or 'bubble'
    })
  }

  createUser(){

  	this.evt.createUser({"email":"test@gmail.com","password":"pass1234","firstName":"Bob","lastName":"Lapprovittola"})
	  	.then(
	  		usr=>{
		  		localStorage.evrythngApiKey = usr.evrythngApiKey;
		  		localStorage.evrythngUser = usr.evrythngUser;
		  	},
		  	err=>{
		  		console.info(err);
		  	}
		);
  }

  

}
