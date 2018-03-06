import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';

import { FirebaseProvider } from "../../providers/firebase/firebase";

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
  selector: 'page-vision',
  templateUrl: 'vision.html',
})
export class VisionPage {
    tstamp = Date.now();
	cloudName:string = 'cloudstrife';
    uploadPreset: string = 'iqx9xm8u';
	bgImg: any = '';
	prod:any;
	heighter : any = "90vh";
	dataLoaded = false;
	tags: Array<any> = [];
	@ViewChild('vid') vid: ElementRef;
	@ViewChild(Content) content: Content;
	tagging:string = 'imagga_tagging';
	floorFont : string = '15vh';
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseProvider, private dom: DomSanitizer, private loader:LoadingController, private render: Renderer2) {
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
    if(this.tagging == "google_tagging"){
    	this.floorFont = '10vh';
    }
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
    let ret = elem['info']['categorization'][this.tagging]['data'];
    console.log(ret);
    ret = this.shuffle(ret);
    return ret;
  }

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
	          self.bgImg = response['secure_url'];
	          self.tags = self.getTags(response);
	          self.dataLoaded = true;

              self.fire.newImage(response).then(console.log).catch(console.info);
              load.dismiss();
            }
          }

          let pid = file.name;
          fd.append('file', base64data);
          fd.append('public_id', pid);
          fd.append('timestamp', self.tstamp.toString());
          //fd.append('upload_preset',self.uploadPreset);
          fd.append('categorization', self.tagging);
          fd.append('auto_tagging','0.25');

          /* no longer need signed uploads */
          let secret = "SJN5BGSKv8GOMDJJvQV1c6VDe0Q"
          //let secret = "BBImHLi3cw-Y_NynlbMU3HYyhH0";
          fd.append('api_key', '532699365372897'); // 299675785887213 Optional - add tag for image admin in Cloudinary
          let signed = sha1('auto_tagging=0.25&categorization='+self.tagging+'&public_id='+pid+'&timestamp='+self.tstamp.toString()+secret);
          fd.append('signature', signed); // Optional - add tag for image admin in Cloudinary
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
