import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as EVT from "evrythng";

/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvtProvider {

  evtApp : any;
  evtUser: any;
   productId = "U4kcDVP2eDsRtKawwkyMdBbr";
   customerId = "U4kTBncPeDswtKaaRFNE8dmk";
   transId = "UHkTh5h6BXsatpRRa2wgNrwt";
  constructor(public http: Http) {

    localStorage.evrythngApiKey = "PfaZ66GBFcScOcANRiUacBs9kOzCLXDpr8AF4n2dfiZpHFUDibxMR13oIoJXUhLElLOme6MuiERRZ1CN";
    localStorage.evrythngUser = "UHh2wE4hVDPRQpwaREFgEaan";

    EVT.setup({
      geolocation:true,
        filter: {
          method: ["ir", "2d", "qr"]
        }

    });

    this.evtApp = new EVT.App("HIxc1MxvO18AJQz6Cnibu9Xiv4A1h6WTH0kNtzvP4fPGoIKWGhA5Qvudi8X21b4xgMo4CtDszxrVD13f");
    
    console.log(this.evtApp);
  }

  createUser(usr:{email:string,password:string,firstName:string,lastName:string}):PromiseLike<any>{
    return this.evtApp.appUser().create({
      email:usr.email,
      password: usr.password,
      firstName: usr.firstName,
      lastName: usr.lastName
    }).then(appUser=>{
      return appUser.validate();
    }).catch(err=>{
      return err
    });
  }


  getUserCustomFields():Promise<any>{
    return new Promise((resolve,reject)=>{
      this.getUserContext().then(usr=>{
        usr.$init.then(user=>{
          console.log(user);
            if(typeof user.customFields !== "undefined"){
              resolve(user.customFields);
            }
            else{
              resolve(false);
            }
        })
      }).catch(err=>{
        reject(err);
      })
    })
  }

  /* return evt user context as a promise */
  getUserContext():Promise<any> {
      return(
        new Promise((resolve,reject)=>{
          resolve(
            new EVT.User({
              id: localStorage.evrythngUser,
              apiKey: localStorage.evrythngApiKey
            }, this.evtApp)
          )})
      )

  }

  getThngData(id:string = '') : Promise<any>{
    let self = this;
    return (
      this.getUserContext().then(user=>{
        return (
          user.$init.then(usr=>{
            return usr.thng(id).read({params:{filter:`product=${self.productId}`}})
          })
        )
      })
    );
  }

  getCustomerData(id:string = '') : Promise<any>{
    let self = this;
    return (
      this.getUserContext().then(user=>{
        return (
          user.$init.then(usr=>{
            return usr.thng(id).read({params:{filter:`product=${self.customerId}`}})
          })
        )
      })
    );
  }

  getTransData(id:string = '') : Promise<any>{
    let self = this;
    return (
      this.getUserContext().then(user=>{
        return (
          user.$init.then(usr=>{
            return usr.thng(id).read({params:{filter:`product=${self.transId}`}})
          })
        )
      })
    );
  }

}
