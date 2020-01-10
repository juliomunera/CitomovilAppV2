import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Valores } from '../../entities/LastComEntity';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the CircDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-circ-detail',
  templateUrl: 'circ-detail.html',
})
export class CircDetailPage {

  groupItem : Valores;

  constructor(public navCtrl: NavController, 
              private iab: InAppBrowser,
              public navParams: NavParams) {
      this.groupItem = navParams.get('param1');

      if(this.groupItem !== undefined)
      {
        this.groupItem.Comentario = this.groupItem.Comentario.replace('<', '');
        this.groupItem.Comentario = this.groupItem.Comentario.replace('>', '');
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CircDetailPage');
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  openFile() {
    // window.open(this.groupItem.Adjunto, '_system', 'location=yes'); return false;

    this.openInAppBrowser(this.groupItem.Adjunto);
    return false;
  }

  openInAppBrowser(url){
    const browser = this.iab.create(url,'_blank', 'location=no,closebuttoncaption=Cerrar');
    browser.show();
  }
  

}
