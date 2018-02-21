import { Component , Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { EvtProvider } from "../../providers/evt/evt";

import * as loadImage from 'blueimp-load-image';
/**
 * Generated class for the ProductFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-product-form',
  templateUrl: 'product-form.html',
})
export class ProductFormPage {

 	productId = "U4kcDVP2eDsRtKawwkyMdBbr";
	product:any = {"productName":"","productPrice":0,"brandName":"","productDescription":"","productImage":[]};
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public render: Renderer2, private evt: EvtProvider, private loader: LoadingController) {
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
  			"brandName":this.product.brandName,
  			"price":this.product.productPrice,
  			"images":JSON.stringify(this.product.productImage)
  		};
  	let th = {
  		product: this.productId,
  		name: this.product.productName,
  		properties: prodProperties,
  		description: this.product.productDescription,
  		tags: ['active']
  	}
  	let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: false,
      showBackdrop: true,
      content: `Saving...`,
      enableBackdropDismiss:false});
    load.present();
  	this.evt.getUserContext().then(user=>{
  		user.$init.then(usr=>{
  			usr.thng().create(th).then(console.log).catch(console.info);
  			load.dismiss();
  			self.dismiss();
  		}).catch(console.info);
  	}).catch(console.info);
  }

  perf($event){

  	let self = this;
  	let fls = $event.target.files;
  	for(let i=0;i<fls.length;i++){
  		let file = fls[i];
	    loadImage.parseMetaData(file, function(data){
	         let oren = 0;
	         if(data.exif){
	           oren = data.exif.get('Orientation');
	         }

	      loadImage(file,

	        function(img){
	          let base64data = img.toDataURL("image/jpeg");
	          self.product.productImage.push(base64data);
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

}
