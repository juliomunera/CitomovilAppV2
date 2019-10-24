import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CircDetailPage } from '../circ-detail/circ-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  Open()
  {
    this.navCtrl.push(CircDetailPage);
  }

}
