import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var firebase;
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

	database : any;
  constructor(public http: HttpClient) {
    console.log('Hello FirebaseProvider Provider',firebase);
    this.database = firebase.database();
    console.log(this.database);
  }

  getRoot(){
  	let rootRef = this.database.ref("item");
	let key = rootRef.key; 
	return key;
  }

  getVal(ref:string = "item"){
  	this.database.ref(ref).once('value').then(function(snapshot) {
  		console.log(snapshot);
  		return snapshot.val() || {};
  // ...
	});
  	//return refr;
  }

  createUser(userData): Promise<any>{
  	let id = Date.now().toString(); //need more complexity
  	return this.database.ref('users/'+id).set(userData);

  		/*{
	  		username: userData.name,
	  		email: userData.email,
	  		pic: userData.pic,
	  		status: "active"
	  	}*/
  }

  deleteUser(userId: string = "") : Promise<any>{
  	return this.database.ref(`users/${userId}`).once('value').then((res)=>{
  		let uData = res.val();
  		uData.status = "deleted";
  		return this.database.ref(`users/${userId}`).set(uData);
  	});

  }

  getUser(userId):Promise<any>{
  	return this.database.ref(`users/${userId}`).once('value').then((res)=>{
  		return res.val();
  	});
  }

  getAllUsers():Promise<any>{
  	return this.database.ref(`users`).once('value').then((res)=>{
  		return res.val();
  	});
  }

  newImage(imgData): Promise<any>{
  	let id = Date.now().toString();
  	return this.database.ref('images/'+id).set(imgData);
  }

  updateWholeImage(id:string = '',imgData):Promise<any>{
  	return this.database.ref(`images/${id}`).set(imgData);
  }

  getAllImages():Promise<any>{
  	return this.database.ref(`images`).once('value').then((res)=>{
  		return res.val();
  	})
  }

}
