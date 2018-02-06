import {NgModule} from '@angular/core';
import {ImageTrackerComponent} from "./image-tracker";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule,
    ],
    declarations: [
        ImageTrackerComponent,
    ],
    exports: [
        ImageTrackerComponent
    ]
})
export class ImageTrackerComponentModule {

}
