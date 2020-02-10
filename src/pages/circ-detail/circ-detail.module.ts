import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CircDetailPage } from './circ-detail';

@NgModule({
  declarations: [
    CircDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CircDetailPage),
  ],
  exports: [
    CircDetailPage
  ]
})
export class CircDetailPageModule {}
