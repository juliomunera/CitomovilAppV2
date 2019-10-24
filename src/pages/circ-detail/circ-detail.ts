import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Valores } from '../../entities/LastComEntity';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    window.open(this.groupItem.Adjunto, '_system', 'location=yes'); return false;
  }
  

}
