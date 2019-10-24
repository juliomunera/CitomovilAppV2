import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';

import { PersonalAlertsPage } from '../personal-alerts/personal-alerts';
import { CircDetailPage } from '../circ-detail/circ-detail';
import { PostEntity, ListComEntity, Valores } from '../../entities/LastComEntity';
import { ComunicationServiceProvider } from '../../providers/comunication-service/comunication-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  postInfo : PostEntity = new PostEntity();
  listGrupalInfo : ListComEntity;
  listSingleInfo : ListComEntity;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private comunicationService : ComunicationServiceProvider,
    public loadingCtrl: LoadingController,
    public events: Events) {

    let loading = this.loadingCtrl.create({
      content: 'Cargando la información...'
    });
  
    loading.present();

    this.comunicationService.getAllGroupsMessages(this.postInfo)
           .then(data => {

             this.listGrupalInfo = <ListComEntity>data;
             if (this.listGrupalInfo !== undefined && this.listGrupalInfo.totalInstancias > 0)
             {
              //  this.msgCount = this.listGrupalInfo.totalInstancias
              //  this.events.publish('msgCount:updated', this.msgCount);

              //  this.events.publish('couCount:updated', this.couCount);
               loading.dismiss();
             }                      
           })
           .catch( err => {
                 loading.dismiss();

                 this.showAlert('Error', 
                   'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
                 return;
               }
           );

      this.comunicationService.getAllSingleMessages(this.postInfo)
           .then(data => {

             this.listSingleInfo = <ListComEntity>data;
             if (this.listSingleInfo !== undefined && this.listSingleInfo.totalInstancias > 0)
             {
              //  this.msgCount = this.msgCount + this.listSingleInfo.totalInstancias
              //  this.events.publish('msgCount:updated', this.msgCount);

              //  this.events.publish('couCount:updated', this.couCount);
           
             }                      
           })
           .catch( err => {
                 loading.dismiss();

                 this.showAlert('Error', 
                   'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
                 return;
               }
           );

  }

  RedirectPersonalPage(per : Valores, total : any){

    if (per.ComunicacionLeida === 'N') {
      let loading = this.loadingCtrl.create({
        content: 'Cargando la información...'
      });
    
      loading.present();

      this.comunicationService.markMessages(per.IdComunicacion)
      .then(data => {

          this.events.publish('msgCount:updated', total);

          for (let item of this.listSingleInfo.resultados) {
            if(item.IdComunicacion === per.IdComunicacion) {
              item.ComunicacionLeida = 'S';
            }  
          }

          loading.dismiss();
                    
      })
      .catch( err => {
            loading.dismiss();

            this.showAlert('Error', 
              'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
            return;
          }
      );
    }

    this.navCtrl.push(PersonalAlertsPage, {
      param1: per} );        
  }

  RedirectCircularPage(grup : Valores, total : any){

    if (grup.ComunicacionLeida === 'N') {
      let loading = this.loadingCtrl.create({
        content: 'Cargando la información...'
      });
    
      loading.present();

      this.comunicationService.markMessages(grup.IdComunicacion)
      .then(data => {

          this.events.publish('msgCount:updated', total);

          for (let item of this.listGrupalInfo.resultados) {
            if(item.IdComunicacion === grup.IdComunicacion) {
              item.ComunicacionLeida = 'S';
            }  
          }

          loading.dismiss();
       
      })
      .catch( err => {
            loading.dismiss();

            this.showAlert('Error', 
              'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
            return;
          }
      );
    }

    this.navCtrl.push(CircDetailPage, {
      param1: grup} );
  }

  showAlert(title : string, subtitle : string)
  {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [{
                  text: 'Aceptar'
                }]
      });
      alert.present();
  }

  ionViewWillEnter() {
    /*
    if(this.listSingleInfo !== undefined && this.listSingleInfo.resultados !== undefined)
      alert('this.listSingleInfo.resultados.length: ' + this.listSingleInfo.resultados.length);
      */
  }

}
