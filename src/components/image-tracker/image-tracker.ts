import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Slides, LoadingController, App } from 'ionic-angular';

import { EvtProvider } from '../../providers/evt/evt';

//var sha1 = require('sha1');
import * as loadImage from 'blueimp-load-image';

/**
 * Generated class for the ImageTrackerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-tracker',
  templateUrl: 'image-tracker.html'
})
export class ImageTrackerComponent {
  tstamp = Date.now();
	//cloudName:string = 'demoengmntprty';
  cygHistory:Array<any> = [];
	cloudName:string = 'cloudstrife';
  uploadPreset: string = 'iqx9xm8u';
  text: string;
  photoProg: Array<any> = [];
  canAddTodaysPhoto: boolean = false;
  @ViewChild('Slides') slider: Slides;
  @Output() uploaded: EventEmitter<any> = new EventEmitter();
  isLoggedIn: boolean = false;

  constructor(private loader: LoadingController, private evt: EvtProvider) {
    console.log('Hello ImageTrackerComponent Component');
    this.text = 'Hello World';
    /*let d = new Date();
    this.tstamp = d.setDate(d.getDate() - 1);*/
  }

  ngOnInit(){
  	return ;
  }

  ngAfterViewInit(){
  	/*setTimeout(()=>{
  		this.slider.slideTo(this.photoProg.length+1);
  	},300);*/
    let self = this;
    this.evt.getUserCustomFields().then((cF)=>{
      self.photoProg = cF.photoHistory || [];
      if(self.photoProg.length < 1){
        this.fetchCYGfromStorage();
      }
      else{
        localStorage.cygHistory = JSON.stringify(self.photoProg);
      }
      self.uploaded.emit(false);
      setTimeout(()=>{
        self.slider.slideTo(self.photoProg.length-1);
      },500);
      //console.log(cF,this.today);
      self.canUploadPhoto();
    });
  }

/* transfer to EVT service */
  patchEVTUserCF(){
    let self = this;
    this.evt.getUserCustomFields().then((cF)=>{
      let nCF = cF || {};
      nCF.photoHistory = self.photoProg;
      console.log(nCF);
      return nCF;
    })
    .catch(console.info)
    .then((cF)=>{
      let upData = {
        customFields:cF
      };
      console.log(upData);
      self.evt.getUserContext().then(usr=>{
        console.log(usr);
        usr.update(upData).then(console.log).catch(console.info);
      })
      .catch(console.info);
    })
    .catch(console.info);
  }

  canUploadPhoto(){
    let self = this;
    self.canIHasToday().then(i=>{
      console.log(i);
      if(i){
        self.canAddTodaysPhoto = true;
        if(localStorage.debugMode === '1'){
          self.canAddTodaysPhoto = true;
          self.tstamp = self.getNextAvailablePushDate(); 
        }
        //console.log('shouldve used ',self.getNextAvailablePushDate());
      }
      else{
        self.canAddTodaysPhoto = true;
      }
    });
  }

  canIHasToday():PromiseLike<any>{
    let self = this;
    return new Promise((resolve,reject)=>{
      if(typeof localStorage.cygHistory == "undefined" || localStorage.cygHistory === "{}"){
        resolve(false);
      }else{
        let localCpy :Array<any>= JSON.parse(localStorage.cygHistory);
        resolve(localCpy.find((val)=>{
          let v1 = self.toLocaleDateString(val.timestamp);
          let v2 = self.toLocaleDateString(self.tstamp);
          //console.log(v1,v2,v1==v2);
          return v1==v2;
        })
        );
      }
    })
  }

  sliderChanged(event = null){
    if(this.slider.isBeginning()){
      this.slider.lockSwipeToPrev(true);
      this.slider.lockSwipeToNext(false);
    }
    else if(this.slider.isEnd()){
      this.slider.lockSwipeToNext(true);
      this.slider.lockSwipeToPrev(false);
    }
    else{
      this.slider.lockSwipeToPrev(false);
      this.slider.lockSwipeToNext(false);
    }

  }

  unlockSlides(){
  	this.slider.lockSwipeToNext(false);
  	this.slider.lockSwipeToPrev(false);
  }

  takePhotoAction($event){
    return ;
  }

/* initiate picture */
  takePic($event){
    let self = this;
    if($event.target.files && $event.target.files[0]){
    	self.uploadFile($event.target.files[0]);
    }

  }

  // *********** Upload file to Cloudinary ******************** //
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
              self.photoProg.push({photoUrl:response.secure_url,timestamp:self.tstamp});

              self.patchEVTUserCF();
              self.unlockSlides();
              setTimeout(()=>{
                self.slider.slideTo(self.photoProg.length-1);
                localStorage.cygHistory = JSON.stringify(self.photoProg);
                self.uploaded.emit(true);
                self.canAddTodaysPhoto = true;
              },500);
              load.dismiss();
            }
          }

          let pid = file.name;
          fd.append('file', base64data);
          fd.append('public_id', pid);
          fd.append('timestamp', self.tstamp.toString());
          fd.append('tags','browser_upload');
          fd.append('upload_preset',self.uploadPreset);

          /* no longer need signed uploads */
          //let secret = "uJkQIneMpHgAJkqho1NLFroqGUg"
          //let secret = "BBImHLi3cw-Y_NynlbMU3HYyhH0";
          //fd.append('api_key', '572517737342669'); // 299675785887213 Optional - add tag for image admin in Cloudinary
          //let signed = sha1('public_id='+pid+'&timestamp='+self.tstamp+secret);
          //fd.append('signature', signed); // Optional - add tag for image admin in Cloudinary
          xhr.send(fd);
        },

        {
          canvas:true,
          orientation:oren,
          maxWidth:400,
          maxHeight:400
        }
       )
    });

  }

  toLocaleDateString(dt){
    return new Date(parseInt(dt)).toLocaleDateString();
  }

  getNextAvailablePushDate(){
    let dy = eval(localStorage.cygHistory).sort(this.compare);
    let tmpD = new Date().setDate(new Date(dy[dy.length-1]['timestamp']).getDate() + 1);
    tmpD = new Date(tmpD).setMonth(new Date(dy[dy.length-1]['timestamp']).getMonth());
    return tmpD;
  }

  compare(a:{photoUrl:string,timestamp:any},b:{photoUrl:string,timestamp:any}) {
    if (a.timestamp < b.timestamp)
      return -1;
    if (a.timestamp > b.timestamp)
      return 1;
    return 0;
  }

  fetchCYGfromStorage(){
    if(localStorage.cygHistory && localStorage.cygHistory !== "{}" && JSON.parse(localStorage.cygHistory)){
      this.photoProg = JSON.parse(localStorage.cygHistory);
    }
  }

  getPhotoCount(){
    return this.photoProg.length;
  }

}
