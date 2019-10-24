import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponListPage } from './coupon-list';

@NgModule({
  declarations: [
    CouponListPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponListPage),
  ],
})
export class CouponListPageModule {}
