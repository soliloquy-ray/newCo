import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content } from 'ionic-angular';

import { FirebaseProvider } from "../../providers/firebase/firebase";

/**
 * Generated class for the VisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-fire',
  templateUrl: 'view-fire.html',
})
export class ViewFirePage {
	bgImg: any = '';
	prod:any;
	heighter : any = "100vh";
	dataLoaded = false;
	tags: Array<any> = [];
	@ViewChild('vid') vid: ElementRef;
	@ViewChild(Content) content: Content;
	floorFont : string = '0.075vh';
	list: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseProvider, private loader:LoadingController, private render: Renderer2) {
    let self = this;
    fire.getAllImages().then(res=>{
    	for(var propt in res){
    		if(res.hasOwnProperty(propt)){
    			self.list.push(res[propt]);
    		}
    	}
    	localStorage.setItem('gallery',JSON.stringify(res));
    })
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ViewFirePage');
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

  scrollingInTheDeep($event){
  	//console.log($event);
  	this.content.scrollTo(0,this.heighter.replace(/[^0-9]/g,""),300);
  }

}
