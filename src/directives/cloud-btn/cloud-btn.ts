import { Directive, Input, Output, EventEmitter } from '@angular/core';

import { LoadingController } from 'ionic-angular';

import { FirebaseProvider } from "../../providers/firebase/firebase";

import {keys} from "../../config/keys";

declare var require: any;
var sha1 = require('sha1');
import * as loadImage from 'blueimp-load-image';

/**
 * Generated class for the CloudBtnDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[cloud-btn]', // Attribute selector
  host: {
    '(change)': 'takePic($event)',
    '(click)': 'logClick($event)'
  }
})
export class CloudBtnDirective {

    tstamp = Date.now();
	cloudName:string = keys.cloudinary.cloudName;
	secretKey: string = keys.cloudinary.secretKey;
	apiKey: string = keys.cloudinary.apiKey;
	@Input('fn') fn: Function;
	@Input('maxHeight') maxHeight:number = 800;
	@Input('maxWidth') maxWidth:number = 800;
	@Input('params') params:Array<any> = [];
	@Output('frag') frag = new EventEmitter;

  constructor(private loader: LoadingController, private fire: FirebaseProvider) {
    console.log('Hello CloudBtnDirective Directive');
  }

  logClick($event){
  	console.log($event,this);
  }


   takePic($event) {
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
    load.present();
    let file = $event.target.files[0];
	let self = this;
	let hashStr = "";
	let nKeys = Object.keys(self.params);
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
              //self.fn(JSON.parse(xhr.responseText));
              self.frag.emit(JSON.parse(xhr.responseText));
              self.fire.newImage(xhr.responseText).then(console.log).catch(console.info);
              load.dismiss();
            }
          }

          let pid = file.name;
          fd.append('file', base64data);
          fd.append('public_id', pid);
          fd.append('timestamp', self.tstamp.toString());
          //fd.append('upload_preset',self.uploadPreset);

          nKeys.forEach((val,ind)=>{
          	let vv = self.params[val];
          	hashStr += `${val}=${vv}&`;
          	fd.append(val,vv);
          });
          //fd.append('categorization', "imagga_tagging");
          //fd.append('auto_tagging','0.6');
          //fd.append('ocr','adv_ocr');

          /* no longer need signed uploads */
          let secret = self.secretKey;
          //let secret = "BBImHLi3cw-Y_NynlbMU3HYyhH0";
          fd.append('api_key', self.apiKey); // 299675785887213 Optional - add tag for image admin in Cloudinary
          let signed = sha1(hashStr+'public_id='+pid+'&timestamp='+self.tstamp.toString()+secret);
          fd.append('signature', signed); // Optional - add tag for image admin in Cloudinary
          xhr.send(fd);
        },

        {
          canvas:true,
          orientation:oren,
          maxWidth:self.maxWidth,
          maxHeight:self.maxHeight
        }
       )
    });

  }

}
