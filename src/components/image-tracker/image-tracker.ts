import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Slides, LoadingController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

declare var require: any;
var sha1 = require('sha1');
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

  constructor(private loader: LoadingController, private fire: FirebaseProvider) {
    console.log('Hello ImageTrackerComponent Component');
    this.text = 'Hello World';
    /*let d = new Date();
    this.tstamp = d.setDate(d.getDate() - 1);*/
  }

  ngOnInit(){
  	//console.log(sha1("test"));
  }

  ngAfterViewInit(){
  	/*setTimeout(()=>{
  		this.slider.slideTo(this.photoProg.length+1);
  	},300);*/
    let self = this;
    this.fire.getAllImages().then(res=>{
      Object.keys(res).forEach((val,ind)=>{
         self.photoProg.push(res[val]);
      });
      console.log(self.photoProg);
    }).catch(console.info);
    /*this.evt.getUserCustomFields().then((cF)=>{
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
    });*/
  }

  getTags(elem){
    let ret = elem['info']['categorization']['aws_rek_tagging']['data'];
    console.log(ret);
    return ret;
  }

  getOcr(elem){
    let fT = elem['info']['ocr']['adv_ocr']['data'][0]['fullTextAnnotation']['text'];
    let tArr = {};
    let tAno :Array<any> = elem['info']['ocr']['adv_ocr']['data'][0]['textAnnotations'].map((res)=>{
      return res.description;
    });
    tArr[0] = fT;
    tArr[1] = tAno;
    console.log(tArr);
    return tArr;
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
              self.photoProg.push(response);

              setTimeout(()=>{
                localStorage.cygHistory = JSON.stringify(self.photoProg);
                self.fire.newImage(response).then(console.log).catch(console.info);
              },500);
              load.dismiss();
            }
          }

          let pid = file.name;
          fd.append('file', base64data);
          fd.append('public_id', pid);
          fd.append('timestamp', self.tstamp.toString());
          fd.append('tags','browser_upload');
          //fd.append('upload_preset',self.uploadPreset);
          fd.append('categorization', "aws_rek_tagging");
          fd.append('auto_tagging','0.6');
          fd.append('ocr','adv_ocr');

          /* no longer need signed uploads */
          let secret = "SJN5BGSKv8GOMDJJvQV1c6VDe0Q"
          //let secret = "BBImHLi3cw-Y_NynlbMU3HYyhH0";
          fd.append('api_key', '532699365372897'); // 299675785887213 Optional - add tag for image admin in Cloudinary
          let signed = sha1('auto_tagging=0.6&categorization=aws_rek_tagging&ocr=adv_ocr&public_id='+pid+'&tags=browser_upload&timestamp='+self.tstamp.toString()+secret);
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
