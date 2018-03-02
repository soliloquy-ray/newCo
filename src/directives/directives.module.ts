import { NgModule } from '@angular/core';
import { ParallaxHeaderDirective } from './parallax-header/parallax-header';
import { CloudBtnDirective } from './cloud-btn/cloud-btn';
@NgModule({
	declarations: [ParallaxHeaderDirective,
    CloudBtnDirective],
	imports: [],
	exports: [ParallaxHeaderDirective,
    CloudBtnDirective]
})
export class DirectivesModule {}
