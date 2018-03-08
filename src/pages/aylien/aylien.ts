import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';

import { FirebaseProvider } from "../../providers/firebase/firebase";

import {keys} from "../../config/keys";

declare var require: any;
var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: keys.aylien.appID,
  application_key: keys.aylien.key
});

import * as loadImage from 'blueimp-load-image';

/**
 * Generated class for the VisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aylien',
  templateUrl: 'aylien.html',
})
export class AylienPage {
    tstamp = Date.now();
	cloudName:string = keys.cloudinary.cloudName;
    uploadPreset: string = keys.cloudinary.uploadPreset;
	bgImg: any = '';
	prod:any;
	heighter : any = "90vh";
	dataLoaded = false;
	tags: Array<any> = [];
	@ViewChild('vid') vid: ElementRef;
	@ViewChild(Content) content: Content;
	floorFont : string = '0.075vh';
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseProvider, private loader:LoadingController, private render: Renderer2) {
  }

  ionViewDidLoad() {
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

  getTags(elem){
    let ret = elem['image-tags']['tags'];
    //let merged =  [].concat.apply([], ret);
    ret = this.shuffle(ret);
    return ret;
  }

  takePic($event){
    let self = this;
    if($event.target.files && $event.target.files[0]){
    	self.uploadFile($event.target.files[0]);
    }

  }

  tappedOut($event){
  	Array.from(document.getElementsByClassName('sel')).forEach((a,ind)=>{
  		a.classList.remove("sel");
  	});
  	$event.target.classList.add("sel");
  }

  shuffle(array) {
	  let currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
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
	          let bgImg = response['secure_url'];
	          //self.tags = self.getTags(response);

              textapi.imageTags({
              	url:bgImg
              },
              function(error,resp) {
              	if(error === null){
              		console.log(resp);
		            self.fire.newImage(resp).then(console.log).catch(console.info);
			        self.dataLoaded = true;
			        self.bgImg = bgImg;
		            self.tags = self.getTags(resp);
		            load.dismiss();
              	}
              });
              
            }
          }

          let pid = file.name;
          fd.append('file', base64data);
          fd.append('public_id', pid);
          fd.append('timestamp', self.tstamp.toString());
          fd.append('upload_preset',self.uploadPreset);
          //fd.append('categorization', self.tagging);
          //fd.append('auto_tagging','0.25');
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
