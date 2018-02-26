import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ql: any;
  constructor(public navCtrl: NavController) {
  }

  ionViewWillEnter(){
    //this.navCtrl.setRoot(MyProductsPage);
  }

  ngOnInit(){
    //this.fire.createUser({name:"Bob Laprovittola",email:"tepdemo@gmail.com",pic:"http://res.cloudinary.com/jandjstaging/image/upload/v1519177418/image.jpg_1519177395092.jpg"});
    
  }

  

}
