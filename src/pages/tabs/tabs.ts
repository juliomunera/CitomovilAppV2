import { Component } from '@angular/core';

import { CouponListPage } from '../coupon-list/coupon-list';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public msgCount: number = 0;
  public couCount: number = 0;

  tab1Root = HomePage;
  tab2Root = CouponListPage;
  tab3Root = ContactPage;

  constructor(public events: Events) {
    this.events.subscribe('msgCount:updated', (count) => {
      this.msgCount = this.msgCount + count;
    });
    this.events.subscribe('couCount:updated', (count) => {
      this.couCount = this.couCount + count;
    });
  }
  

}
