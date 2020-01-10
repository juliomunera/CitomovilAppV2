import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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

  constructor(public navCtrl: NavController, 
    private iab: InAppBrowser,
    public navParams: NavParams) {
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
    //window.open(this.personalItem.Adjunto, '_system', 'location=yes'); return false;

    this.openInAppBrowser(this.personalItem.Adjunto);
    return false;
  }

  openInAppBrowser(url){
    const browser = this.iab.create(url,'_blank', 'location=no,closebuttoncaption=Cerrar,enableViewportScale=yes');
    browser.show();
  }
  
}
