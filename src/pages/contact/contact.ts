import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';

import { PersonalAlertsPage } from '../personal-alerts/personal-alerts';
import { CircDetailPage } from '../circ-detail/circ-detail';
import { PostEntity, ListComEntity, Valores } from '../../entities/LastComEntity';
import { ComunicationServiceProvider } from '../../providers/comunication-service/comunication-service';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { StorageEntity } from '../../entities/storageEntity';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  postInfo : PostEntity = new PostEntity();
  listGrupalInfo : ListComEntity;
  listSingleInfo : ListComEntity;

  private database: SQLiteObject;
  entityResult : StorageEntity;

  msgCount : number = 0;
  couCount : number = 0;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    private comunicationService : ComunicationServiceProvider,
    public loadingCtrl: LoadingController,
    private plt: Platform, 
    private sqlite: SQLite,
    public events: Events) {

    let loading = this.loadingCtrl.create({
      content: 'Cargando la información...'
    });
  
    loading.present();

    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'citomovil.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;

          return this.database.executeSql(
            `SELECT id, ClientID, PhoneNumber, CodeNumber, ApplicationID, DeviceID, ProjectID, DoormanPhoneNumber, Token FROM SettingsData`, [])
          .then((data) => {

            
            this.entityResult = new StorageEntity();

            if (data === undefined)
              return this.entityResult;

            if (data !== undefined && data !== null) {

                if(data.rows.length>0){

                  this.entityResult.id = data.rows.item(0).id;
                  this.entityResult.PhoneNumber = data.rows.item(0).PhoneNumber;
                  this.entityResult.CodeNumber = data.rows.item(0).CodeNumber;
                  this.entityResult.ApplicationID = data.rows.item(0).ApplicationID;
                  this.entityResult.DeviceID = data.rows.item(0).DeviceID;
                  this.entityResult.ProjectID = data.rows.item(0).ProjectID;
                  this.entityResult.DoormanPhoneNumber = data.rows.item(0).DoormanPhoneNumber;
                  this.entityResult.Token = data.rows.item(0).Token; 
                  this.entityResult.ClientId = data.rows.item(0).ClientID; 
                }
              }

              
              this.comunicationService.getAllGroupsMessages(this.entityResult.PhoneNumber, this.entityResult.ClientId, this.entityResult.ProjectID, this.entityResult.ApplicationID, this.entityResult.Token)
              .then(data => {
   
                this.listGrupalInfo = <ListComEntity>data;
                if (this.listGrupalInfo !== undefined && this.listGrupalInfo.totalInstancias > 0)
                {
                  // this.msgCount = this.listGrupalInfo.totalInstancias
                  // alert(this.msgCount);
                  
                  // this.events.publish('msgCount:updated', this.msgCount);
   
                  // this.events.publish('couCount:updated', this.couCount);
                  loading.dismiss();
                }
                               
              }).catch(()=> loading.dismiss());

              this.comunicationService.getAllSingleMessages(this.entityResult.PhoneNumber, this.entityResult.ClientId, this.entityResult.ProjectID, this.entityResult.ApplicationID, this.entityResult.Token)
              .then(data => {
   
                this.listSingleInfo = <ListComEntity>data;
                if (this.listSingleInfo !== undefined && this.listSingleInfo.totalInstancias > 0)
                {
                  // this.msgCount = this.msgCount + this.listSingleInfo.totalInstancias
                  // this.events.publish('msgCount:updated', this.msgCount);
   
                  // this.events.publish('couCount:updated', this.couCount);
              
                } 
                
                loading.dismiss();
              }).catch(()=> loading.dismiss());


            }).catch(()=> loading.dismiss());

      });
    });


  }

  RedirectPersonalPage(per : Valores, total : any){

    if (per.ComunicacionLeida === 'N') {
      let loading = this.loadingCtrl.create({
        content: 'Cargando la información...'
      });
    
      loading.present();

      this.comunicationService.markMessages(per.IdComunicacion, 'I', this.entityResult.PhoneNumber, this.entityResult.Token)
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

      this.comunicationService.markMessages(grup.IdComunicacion, 'G', this.entityResult.PhoneNumber, this.entityResult.Token)
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

}
