import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as EVT from "evrythng";

/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvtProvider {

	evtApp : any;
	evtUser: any;
  constructor(public http: Http) {

  	EVT.setup({
  		geolocation:true,
	      filter: {
	        method: ["ir", "2d", "qr"]
	      }

  	});

    this.evtApp = new EVT.App("HIxc1MxvO18AJQz6Cnibu9Xiv4A1h6WTH0kNtzvP4fPGoIKWGhA5Qvudi8X21b4xgMo4CtDszxrVD13f");
    
    console.log(this.evtApp);
  }

  createUser(usr:{email:string,password:string,firstName:string,lastName:string}):PromiseLike<any>{
  	return this.evtApp.appUser().create({
  		email:usr.email,
  		password: usr.password,
  		firstName: usr.firstName,
  		lastName: usr.lastName
  	}).then(appUser=>{
  		return appUser.validate();
  	}).catch(err=>{
  		return err
  	});
  }


  getUserCustomFields():Promise<any>{
  	return new Promise((resolve,reject)=>{
	  	this.getUserContext().then(usr=>{
	  		usr.$init.then(user=>{
          console.log(user);
	          if(typeof user.customFields !== "undefined"){
			  			resolve(user.customFields);
			  		}
			  		else{
			  			resolve(false);
			  		}
	  		})
	  	}).catch(err=>{
	  		reject(err);
	  	})
  	})
  }

  /* return evt user context as a promise */
  getUserContext():Promise<any> {
      return(
        new Promise((resolve,reject)=>{
          resolve(
            new EVT.User({
              id: localStorage.evrythngUser,
              apiKey: localStorage.evrythngApiKey
            }, this.evtApp)
          )})
      )

  }

}
