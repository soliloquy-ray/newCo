import { NgModule } from '@angular/core';

import { ImageTrackerComponentModule } from './image-tracker/image-tracker.module';
import { SideMenuComponentModule } from './side-menu/side-menu.module';
@NgModule({
	declarations: [],
	imports: [],
	exports: [
    ImageTrackerComponentModule,
    SideMenuComponentModule,
  ]
})
export class ComponentsModule {}
