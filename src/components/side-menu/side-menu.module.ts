import {NgModule} from '@angular/core';
import {SideMenuComponent} from "./side-menu";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        SideMenuComponent
    ],
    exports: [
        SideMenuComponent
    ]
})
export class SideMenuComponentModule {

}
