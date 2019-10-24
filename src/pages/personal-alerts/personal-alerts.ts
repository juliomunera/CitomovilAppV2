import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Valores } from '../../entities/LastComEntity';

/**
 * Generated class for the PersonalAlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-alerts',
  templateUrl: 'personal-alerts.html',
})
export class PersonalAlertsPage {

  personalItem : Valores;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.personalItem = navParams.get('param1');

    if(this.personalItem !== undefined)
    {
      this.personalItem.Comentario = this.personalItem.Comentario.replace('<', '');
      this.personalItem.Comentario = this.personalItem.Comentario.replace('>', '');
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalAlertsPage');
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  openFile() {
    window.open(this.personalItem.Adjunto, '_system', 'location=yes'); return false;
  }
  
}
