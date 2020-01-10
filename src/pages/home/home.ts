import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController, AlertController, ModalController, LoadingController } from 'ionic-angular';

import { CircDetailPage } from '../circ-detail/circ-detail';
import { PersonalAlertsPage } from '../personal-alerts/personal-alerts';
import { AboutPage } from '../about/about';
import { CouponListPage } from '../coupon-list/coupon-list'; 
import { Events } from 'ionic-angular';

import { LastComEntity, Valores, ListComEntity, TotalMsgEntity } from '../../entities/LastComEntity';
import { ComunicationServiceProvider } from '../../providers/comunication-service/comunication-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { StorageEntity } from '../../entities/storageEntity';

import { Observable } from 'rxjs/rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lastComunication : LastComEntity = new LastComEntity();
  personalInfo : Valores;
  grupalInfo : Valores;
  listGrupalInfo : ListComEntity;
  listSingleInfo : ListComEntity;
  totalMsgInfo : TotalMsgEntity;
  postInfo : any;
  doormanPhone : any = '';
  codeNumber : any = '';

  callDoormanObser : Observable<string>;
  callDoormanBehavior : BehaviorSubject<any>;

  result : any;
  private database: SQLiteObject;
  // private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public msgCount: number = 0;
  public couCount: number = 0;

  constructor(public navCtrl: NavController, 
              private plt: Platform, 
              public alertCtrl: AlertController, 
              public modalCtrl : ModalController, 
              //public storageInfo : StorageEntity,
              //public storageHelper : StorageHelper,
              private comunicationService : ComunicationServiceProvider,
              private sqlite: SQLite,
              public events: Events, 
              public loadingCtrl: LoadingController, 
              public events1: Events,              
              public callNumber : CallNumber
              ) {

    this.couCount = 0;
    this.msgCount = 0;
  
    this.callDoormanBehavior = new BehaviorSubject('');

    // https://dev.to/hitman666/how-to-make-money-with-google-admob-ads-in-ionic-framework-3
    // https://forum.ionicframework.com/t/how-to-pass-data-to-another-page/119413/2
    // window.open(`whatsapp://send?text=&phone=+57${this._datos.datos.tel_porteria}&abid=+57${this._datos.datos.tel_porteria}`);

    // export JAVA_HOME=$(/usr/libexec/java_home)
    // echo $JAVA_HOME    

  }

  ngOnInit() {

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

            let entityResult : StorageEntity;
            entityResult = new StorageEntity();

            if (data === undefined)
              return entityResult;

            if (data !== undefined && data !== null) {

                if(data.rows.length>0){

                  entityResult.id = data.rows.item(0).id;
                  entityResult.PhoneNumber = data.rows.item(0).PhoneNumber;
                  entityResult.CodeNumber = data.rows.item(0).CodeNumber;
                  entityResult.ApplicationID = data.rows.item(0).ApplicationID;
                  entityResult.DeviceID = data.rows.item(0).DeviceID;
                  entityResult.ProjectID = data.rows.item(0).ProjectID;
                  entityResult.DoormanPhoneNumber = data.rows.item(0).DoormanPhoneNumber;
                  entityResult.Token = data.rows.item(0).Token; 
                  entityResult.ClientId = data.rows.item(0).ClientID; 
                  
                  this.doormanPhone = data.rows.item(0).DoormanPhoneNumber;
                  this.codeNumber = data.rows.item(0).CodeNumber;
                }
              }

              if (this.codeNumber === null || this.codeNumber === undefined || this.codeNumber === ''){            
                this.openModal();
              } else {
                this.loadLastNews(entityResult.PhoneNumber, entityResult.Token, 
                  entityResult.ProjectID, entityResult.ClientId, entityResult.ApplicationID);
              }

          })
          .catch(e => {
            this.openModal();
          })
          ;

      });
    });

  }

  callDoorman(){

    if (this.doormanPhone.length === 0)
      return;

    this.callNumber.callNumber(this.doormanPhone, true)
    .then(res => console.log('Llamando...', res))
    .catch(err => console.log('Error launching dialer', err));

  }

  callWhatsapp(){
    if (this.doormanPhone.length === 0)
      return;

      try{
        window.open(`whatsapp://send?text=&phone=+57${this.doormanPhone}&abid=+57${this.doormanPhone}`,'_system', 'location=yes');
      }catch(error)
      {
        alert(error);
      }
  }

  loadLastNews(phoneNumber, tokenCode, projectCode, clientCode, appCode){
    let loading = this.loadingCtrl.create({
      content: 'Cargando la información...'
    });

    loading.present();

    this.comunicationService.getLastComunication(phoneNumber, clientCode, projectCode, appCode, tokenCode)
    .then(data => {
      
      this.lastComunication = <LastComEntity>data;
      this.grupalInfo = undefined;
      this.personalInfo = undefined;
  
      // TODO: Refactorizar
      if(this.lastComunication !== null && this.lastComunication.excepcion.codigo === 0 && this.lastComunication.totalInstancias > 0)
      { 
         if(this.lastComunication.resultados[0] !== undefined )
           if(this.lastComunication.resultados[0].Tipo === 'G')
           {
               this.grupalInfo = this.lastComunication.resultados[0];
               this.grupalInfo.Comentario = this.grupalInfo.Comentario.replace('<','');
               this.grupalInfo.Comentario = this.grupalInfo.Comentario.replace('>','');

               if (this.grupalInfo.Comentario.length > 200)
                 this.grupalInfo.Comentario = this.grupalInfo.Comentario.substring(0, 200) + ' ...';
           }
           else if (this.lastComunication.resultados[0].Tipo === 'I')
           {
               this.personalInfo = this.lastComunication.resultados[0];
               this.personalInfo.Comentario = this.personalInfo.Comentario.replace('<','');
               this.personalInfo.Comentario = this.personalInfo.Comentario.replace('>','');

               if (this.personalInfo.Comentario.length > 200)
                 this.personalInfo.Comentario = this.personalInfo.Comentario.substring(0, 200) + ' ...';
           }

         if (this.lastComunication.resultados[1] !== undefined)
           if(this.lastComunication.resultados[1].Tipo === 'G' )
           {
               this.grupalInfo = this.lastComunication.resultados[1];
               this.grupalInfo.Comentario = this.grupalInfo.Comentario.replace('<','');
               this.grupalInfo.Comentario = this.grupalInfo.Comentario.replace('>','');

               if (this.grupalInfo.Comentario.length > 200)
                 this.grupalInfo.Comentario = this.grupalInfo.Comentario.substring(0, 200) + ' ...';
           }
           else if (this.lastComunication.resultados[1].Tipo === 'I')
           {
               this.personalInfo = this.lastComunication.resultados[1];
               this.personalInfo.Comentario = this.personalInfo.Comentario.replace('<','');
               this.personalInfo.Comentario = this.personalInfo.Comentario.replace('>','');

               if (this.personalInfo.Comentario.length > 200)
                 this.personalInfo.Comentario = this.personalInfo.Comentario.substring(0, 200) + ' ...';
           }

           this.comunicationService.getUnReadMessages(phoneNumber, clientCode, projectCode, appCode, tokenCode)
           .then(data => {

            this.totalMsgInfo = <TotalMsgEntity>data;
             if (this.totalMsgInfo !== undefined && this.totalMsgInfo.totalInstancias > 0 && this.totalMsgInfo.resultados !== undefined)
             {

              for (let item of this.totalMsgInfo.resultados) {
                if(item.Tipo === 'Circulares') {
                  this.msgCount = this.msgCount + Number(item.Total);
                }  
              }

              this.events.publish('msgCount:updated', this.msgCount);
             }  
             loading.dismiss();                    
           })
          //  .catch( err => {
          //        loading.dismiss();

          //        this.showAlert('Error', 
          //          'Ups!, algo no anda bien con la recuperación de los mensajes. Intenta de nuevo.');
          //        return;
          //      }
          //  );

      }else {
        loading.dismiss();
      }

    }).catch( err => {
         loading.dismiss();

         this.showAlert('Error', 
           'Ups!, algo no anda bien al recuperar la última notificación. Intenta de nuevo.' + err.message);
         return;
       }
    );

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

  public openModal(){

    var modalPage = this.modalCtrl.create('EnterCodePage');
    modalPage.present();

    modalPage.onDidDismiss((result) =>{
      if(result){
        
        if (result !== null && result !== undefined) 
        {
          this.doormanPhone = result.doormanPhoneNumber;
          this.loadLastNews(result.phoneNumber, result.tokenCode, result.projectCode, result.clientCode, result.appCode);
        }
        
      }
    });

  } 

  showInterstitialAd() {

  }

  ngAfterViewInit() {
    
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'none';
            });
        }
   }

   RedirectPersonalPage(per : Valores){
        this.navCtrl.push(PersonalAlertsPage, {
          param1: per} );        
   }

   RedirectCircularPage(grup : Valores){
      this.navCtrl.push(CircDetailPage, {
        param1: grup} );
   }

   OpenCirculares(){
    this.navCtrl.push(AboutPage);
   }

   OpenCupones(){
     this.navCtrl.push(CouponListPage);
   }

}
