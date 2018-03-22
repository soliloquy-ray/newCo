import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';

import { Http, RequestOptions, Headers } from '@angular/http';

import { FirebaseProvider } from "../../providers/firebase/firebase";

import {keys} from "../../config/keys";

declare var require: any;
var sha1 = require('sha1');
import * as loadImage from 'blueimp-load-image';

/**
 * Generated class for the VisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocr',
  templateUrl: 'ocr.html',
})
export class OcrPage {
    tstamp = Date.now();
	cloudName:string = keys.cloudinary.cloudName;
    uploadPreset: string = keys.cloudinary.uploadPreset;
	bgImg: any = '';
	prod:any;
	heighter : any = "90vh";
	dataLoaded = false;
	texts : any = [];
	@ViewChild('vid') vid: ElementRef;
	@ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseProvider, private dom: DomSanitizer, private loader:LoadingController, private render: Renderer2, private http: Http) {
  	/*this.fire.getAllImages().then(res=>{
      Object.keys(res).forEach((val,ind)=>{
         this.prod = res[val];
         this.bgImg = res[val]['secure_url'];
         this.tags = this.getTags(res[val]);
         this.texts = this.getOcr(res[val]);
         this.dataLoaded = true;
      });
      console.log(this.prod,this.bgImg);
  	})*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisionPage');
  }

  ngAfterViewInit(){
  	this.heighter = (window.innerHeight)+"px";
  	this.render.setProperty(this.vid.nativeElement,"muted","muted");
  	this.render.setProperty(this.vid.nativeElement,"loop","loop");
  	
  	setTimeout(()=>{
	  	this.vid.nativeElement.play().then(console.log).catch(console.info);
	  	console.log(this.vid.nativeElement);
  	},1000);
  }

  changeup($event){
  	console.log($event);
  	console.log(window.innerHeight, document.body.clientHeight);
  }

  scrollingInTheDeep($event){
  	//console.log($event);
  	this.content.scrollTo(0,this.heighter.replace(/[^0-9]/g,""),300);
  }

  getImageType(filename){
  	return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  ocrTrigger(img):Promise<any>{
  	let self = this;
  	let body = new FormData();
  	body.append('url',img);
  	body.append('language','eng');
  	body.append('apikey',keys.ocr.apiKey);
  	body.append('isOverlayRequired','true');
  	return this.http.post(keys.ocr.endpoint,body).toPromise();
  }
/*
  getOcr(elem){
  	if(typeof elem['info']['ocr']['adv_ocr']['data'][0]['textAnnotations'] == "undefined"){
  		return [[],[],[]];
  	}
    let fT = elem['info']['ocr']['adv_ocr']['data'][0]['fullTextAnnotation']['text'];
    let tArr = {};
    let ct:string = "replace";
    let tAno :Array<any> = elem['info']['ocr']['adv_ocr']['data'][0]['textAnnotations'].reduce((result,res)=>{
    	if(ct === "replace"){
    		ct = res.description;
    	}
    	else{
      		result.push(res.description);
    	}
    	return result;
    },[]);
    tArr[0] = fT;
    tArr[1] = tAno;
    tArr[2] = this.dom.bypassSecurityTrustHtml(ct.replace(/(?:\r\n|\r|\n)/g, '<br>&gt;').replace(/\s\s+/, ''));
    console.log(tArr);
    return tArr;
  }*/

  takePic($event){
    let self = this;
    if($event.target.files && $event.target.files[0]){
    	self.uploadFile($event.target.files[0]);
    }

  }

	uploadFile(file) {
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
    load.present();
		let self = this;
    var url = `https://api.cloudinary.com/v1_1/${self.cloudName}/image/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    loadImage.parseMetaData(file, function(data){
         let oren = 0;
         if(data.exif){
           oren = data.exif.get('Orientation');
         }

      loadImage(file,

        function(img){
          let base64data = img.toDataURL("image/jpeg");
          //let img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
          xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
              // File uploaded successfully
              var response = JSON.parse(xhr.responseText);
              console.log(response);
	          self.prod = response;
	          self.bgImg = response['secure_url'];
	          self.ocrTrigger(self.bgImg)
	          		.then(rs=>{
	          			let res = rs.json();
	          			console.log(res);
  						self.texts = res['ParsedResults'][0]['ParsedText'].split(/\n/).filter(n=>n);
  						console.log(self.texts);
  						response['ocr'] = res;
			            self.fire.newImage(response).then(console.log).catch(console.info);
	          			self.dataLoaded = true;
			            load.dismiss();
					})
					.catch(console.info);

            }
          }

          let pid = file.name;
          fd.append('file', base64data);
          fd.append('public_id', pid);
          fd.append('timestamp', self.tstamp.toString());
          fd.append('upload_preset',self.uploadPreset);
          xhr.send(fd);
        },

        {
          canvas:true,
          orientation:oren,
          maxWidth:800,
          maxHeight:800
        }
       )
    });

  }

}
