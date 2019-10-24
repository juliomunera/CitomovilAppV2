import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ModalController, LoadingController } from 'ionic-angular';

import { CircDetailPage } from '../circ-detail/circ-detail';
import { PersonalAlertsPage } from '../personal-alerts/personal-alerts';
import { AboutPage } from '../about/about';
import { CouponListPage } from '../coupon-list/coupon-list'; 
import { Events } from 'ionic-angular';

import { StorageHelper } from '../../helpers/storage-helper';
import { LastComEntity, Valores, PostEntity, ListComEntity, TotalMsgEntity } from '../../entities/LastComEntity';
import { ComunicationServiceProvider } from '../../providers/comunication-service/comunication-service';

//import { CallNumber } from '@ionic-native/call-number';

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
  postInfo : PostEntity = new PostEntity();
  doormanPhone : string = '';

  public msgCount: number = 0;
  public couCount: number = 0;

  constructor(public navCtrl: NavController, platform: Platform, 
              public alertCtrl: AlertController, public modalCtrl : ModalController, 
              public storage: StorageHelper, private comunicationService : ComunicationServiceProvider,
              public events: Events, public loadingCtrl: LoadingController //, private callNumber: CallNumber
              ) {

    this.couCount = 0;
    this.msgCount = 0;
  
    // https://dev.to/hitman666/how-to-make-money-with-google-admob-ads-in-ionic-framework-3
    // https://forum.ionicframework.com/t/how-to-pass-data-to-another-page/119413/2
    // window.open(`whatsapp://send?text=&phone=+57${this._datos.datos.tel_porteria}&abid=+57${this._datos.datos.tel_porteria}`);

    // export JAVA_HOME=$(/usr/libexec/java_home)
    // echo $JAVA_HOME

    storage.get('CodeNumber')
      .then(
        (data) => {
          this.postInfo = data;

          if (data === null){
            this.openModal();
          } else {
            this.loadLastNews('', '', '', '', '');
          }
        }     
      );

      storage.get('DoormanPhoneNumber')
      .then(
        (data) => {
          this.doormanPhone = data;
        }     
      );
      
 
  }

  callDoorman(){
    if (this.doormanPhone.length === 0)
      return;

    // this.callNumber.callNumber(this.doormanPhone, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));

/*
      this.callNumber.isCallSupported()
      .then(function (response) {
          if (response == true) {
            this.callNumber.callNumber(this.doormanPhone, true)
            .then(() => console.log('Marcando!'))
            .catch(() => console.log('Error al marcar'));
          }
      });

*/
  }

  callWhatsapp(){
    if (this.doormanPhone.length === 0)
      return;

      try{
        window.open(`whatsapp://send?text=&phone=+57${this.doormanPhone}&abid=+57${this.doormanPhone}`);
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

    if (phoneNumber !== '' && tokenCode !== ''){
      this.comunicationService.appCode = appCode;
      this.comunicationService.clientCode = clientCode;
      this.comunicationService.projectCode = projectCode;
      this.comunicationService.tokenCode = tokenCode;
      this.comunicationService.phoneNumber = phoneNumber;
    }

    this.comunicationService.getLastComunication()
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

           this.comunicationService.getUnReadMessages(this.postInfo)
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
           .catch( err => {
                 loading.dismiss();

                 this.showAlert('Error', 
                   'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
                 return;
               }
           );

      }

    }).catch( err => {
         loading.dismiss();

         this.showAlert('Error', 
           'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
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
        
        if (result !== null) 
        {
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

   resetCellphone()
  {
    this.storage.remove('PhoneNumber')
          .then(() => {
            console.log('PhoneNumber Removed');
          });

    this.storage.remove('CodeNumber')
        .then(() => {
          console.log('CodeNumber Removed');
        });
  }

}
