import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OfflineDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfflineDbProvider {

	productList : any = [];
	clientList : any = [];
	transactList : any = [];
  constructor(public http: Http) {
    console.log('Hello OfflineDbProvider Provider');
  }

  storeToProducts(data){
  	this.productList = data;
  }

  storeToClients(data){
  	this.clientList = data;
  }

  storeToTransacts(data){
  	this.transactList = data;
  }

  getProducts(){
  	return this.productList;
  }

  getClients(){
  	return this.clientList;
  }

  getTransacts(){
  	return this.transactList;
  }

}
