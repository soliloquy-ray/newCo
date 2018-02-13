import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvtProvider } from "../../providers/evt/evt";

import * as loadImage from 'blueimp-load-image';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	edit:boolean = false;
	userProfile: any = {"email":"email@mail.com", "firstName":"First Name", "lastName": "Last Name", "cty": "Philippines"};
  constructor(public navCtrl: NavController, public navParams: NavParams, private evt: EvtProvider) {
  }

  ngOnInit(){
  	if(typeof localStorage.resetProfile !== "undefined" && localStorage.resetProfile != "[]"){
  		this.userProfile = JSON.parse(localStorage.resetProfile);
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.fetchEvtData();
  }

  editMode(boole: boolean = false){
  	this.edit = boole;
  	if(boole == true){
  		localStorage.resetProfile = JSON.stringify(this.userProfile);
  	}
  }

  fetchEvtData(){
  	let self = this;
  	this.evt.getUserContext().then(user=>{
  		user.$init.then(usr=>{
  			console.log(usr);
	  		self.userProfile.firstName = usr.firstName;
	  		self.userProfile.lastName = usr.lastName;
	  		self.userProfile.email = usr.email;
	  		if(typeof usr.photo !== "undefined"){
	  			self.userProfile.hasPhoto = true;
	  			self.userProfile.photo = usr.photo;
	  		}
	  		console.log(self.userProfile);	
  		}).catch(console.info);
  	}).catch(console.info);

  }

  saveData(){
  	let upData = {
  		firstName:this.userProfile.firstName,
  		lastName:this.userProfile.lastName,
  		email:this.userProfile.email
  	};
  	let self = this;

  	this.evt.getUserContext().then(user=>{
        user.$init.then(usr=>{
          	usr.update(upData).then(usre=>{
				console.log(usre);
          		self.fetchEvtData();
          	}).catch(console.info);
       	})
	});
	this.editMode();
  }

  cancelEdit(){
  	this.userProfile = JSON.parse(localStorage.resetProfile);
  	this.editMode(false);
  }

  validateImg($event){
  	let self = this;
  	let file = $event.target.files[0];
    loadImage.parseMetaData(file, function(data){
         let oren = 0;
         if(data.exif){
           oren = data.exif.get('Orientation');
         }

      loadImage(file,

        function(img){
          let base64data = img.toDataURL("image/jpeg");
	      let upData = {
	        photo:base64data
	      };
          self.evt.getUserContext().then(user=>{
          	user.$init.then(usr=>{
          		usr.update(upData).then(usre=>{
          			console.log(usre);
          			self.fetchEvtData();
          		}).catch(console.info);
          	})
          })
      	},

        {
          canvas:true,
          orientation:oren,
          maxWidth:400,
          maxHeight:400
        });
  	  });
  }

}
