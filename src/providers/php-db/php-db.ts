import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PhpDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhpDbProvider {

	url: string = "http://localhost/red/api.php";
	params = new HttpParams();
  constructor(public http: HttpClient) {
    console.log('Hello PhpDbProvider Provider');
  }

  getProducts():Promise<any>{
  	return this.http.get(this.url+"?r=get_products").toPromise();
  }

  getClients():Promise<any>{
  	return this.http.get(this.url+"?r=get_clients").toPromise();
  }

  getTrans():Promise<any>{
  	return this.http.get(this.url+"?r=get_trans").toPromise();
  }

  addProduct(dt):Promise<any>{
  	let body = {data:dt};
  	//console.log(body);
  	return this.http.post(this.url+"?r=add_prod", body).toPromise();
  }

  updateImgs(dt):Promise<any>{
  	let body = {data:dt};
  	//console.log(body);
  	return this.http.post(this.url+"?r=update_prod_img", body).toPromise();
  }

  addClient(dt):Promise<any>{
  	let body = {data:dt};
  	//console.log(body);
  	return this.http.post(this.url+"?r=add_client", body).toPromise();
  }

  transact(dt):Promise<any>{
  	let body = {data:dt};
  	//console.log(body);
  	return this.http.post(this.url+"?r=add_trans", body).toPromise();
  }

  deleteTrans(dt):Promise<any>{
  	let body = {data:dt};
  	return this.http.post(this.url+"?r=delete_trans", body).toPromise();
  }

  completeDelivery(dt):Promise<any>{
  	let body = {data:dt};
  	return this.http.post(this.url+"?r=update_trans_status", body).toPromise();
  }

  deleteProd(dt):Promise<any>{
  	let body = {data:dt};
  	return this.http.post(this.url+"?r=delete_prod", body).toPromise();
  }


}
