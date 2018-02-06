import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EvtProvider } from "../../providers/evt/evt";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private evt: EvtProvider) {

  }

  ngOnInit(){
  	this.evt.evtApp.login({email:"test@gmail.com",password:"pass1234"}).then(response=>{
  		console.log(response.user);
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
