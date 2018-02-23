import { Component, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';

import { EvtProvider } from "../../providers/evt/evt";

import * as loadImage from 'blueimp-load-image';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
	prod : any;
	@ViewChildren(Slides, {read: ElementRef}) slideList: QueryList<Slides>;
	imageList : Array<any> = [];
	propSnap: {} = {};
	targ = 0;
	heighter : any = "90vh;"
	@ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private evt: EvtProvider, private sanitizer:DomSanitizer) {
  	if(navParams.get('data')){
  		this.prod = navParams.get('data');
	  	this.imageList = this.prod.properties.images;
	  	this.propSnap = this.prod.properties;
	  	this.prod.description = this.sanitizer.bypassSecurityTrustHtml(this.prod.description.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\s\s+/, ''));
	  	console.log(this.prod,this.imageList);
  	}else if(typeof localStorage.prodList == "string" && localStorage.prodList != "" && localStorage.prodList != "[]" && localStorage.prodList != "{}"){
  		this.prod = JSON.parse(localStorage.prodList)[navParams.get('id')];  
	  	this.prod.description = this.sanitizer.bypassSecurityTrustHtml(this.prod.description.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\s\s+/, ''));		
	  	this.imageList = this.prod.properties.images;
	  	this.propSnap = this.prod.properties;
	  	console.log(this.prod,this.imageList);
  	}else{
  		//fetch from EVT directly
  		let self = this;
  		this.evt.getThngData(navParams.get('id')).then(thng=>{
  			self.prod = thng;
	  		self.prod.description = self.sanitizer.bypassSecurityTrustHtml(self.prod.description.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\s\s+/, ''));
		  	self.imageList = eval(thng.properties.images);
		  	self.propSnap = self.prod.properties;
		  	console.log(self.prod,self.imageList,thng);
  		}).catch(console.info);
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  changeup($event){
  	console.log($event);
  	console.log(window.innerHeight, document.body.clientHeight);
  }

  ngAfterViewInit(){
  	console.log(window.innerHeight, document.body.clientHeight);
  	this.heighter = (window.innerHeight - 44)+"px";
  }

  elec_sld($event){
  	let xd : Slides = $event;
  	if(xd.getActiveIndex() == xd.length()-1){
  		xd.lockSwipeToNext(true);
  		xd.lockSwipeToPrev(false);
  	}
  	if(xd.getActiveIndex() <= 0){
  		xd.lockSwipeToNext(false);
  		xd.lockSwipeToPrev(true);
  	}
  	if(xd.length() <= 1){
  		xd.lockSwipes(true);
  	}

  }

  toggleBG(i){
  	this.targ = i;

  	this.content.scrollToTop();
  }

  scrollingInTheDeep($event){
  	//console.log($event);
  	this.content.scrollTo(0,this.heighter.replace(/[^0-9]/g,""),300);
  }

  perf($event){

  	let self = this;
  	let fls = $event.target.files;
  	let prmsAr = [];
  	for(let i=0;i<fls.length;i++){
  		prmsAr.push(new Promise((resolve,reject)=>{
  		let file = fls[i];
	    loadImage.parseMetaData(file, function(data){
	         let oren = 0;
	         if(data.exif){
	           oren = data.exif.get('Orientation');
	         }

	      loadImage(file,

	        function(img){
	          let base64data = img.toDataURL("image/jpeg");
	          self.imageList.push(base64data);
	          resolve(self.imageList);
	      	},

	        {
	          canvas:true,
	          orientation:oren,
	          maxWidth:400,
	          maxHeight:400
	        });
	  	  });
	    }));
  	}

  	Promise.all(prmsAr).then(func=>{
  		let imgr = JSON.stringify(self.imageList);
  		console.log(imgr);
	  	let propQ = {
	  		key: "images",
	  		value: imgr
	  	};
	  	console.log(propQ);
	  	self.evt.updateThngProperty(self.prod.id,[propQ]);
	});
  }

}
