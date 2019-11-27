import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';

import { StorageHelper } from '../../helpers/storage-helper';
import { AuthProvider } from '../../providers/auth/auth';

import { AuthEntity } from '../../entities/authEntity';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-enter-code',
  templateUrl: 'enter-code.html',
})
export class EnterCodePage {

  public phoneNumber: string = "";
  public codeNumber: string = "";
  public showPhoneCard: boolean = false;
  public showCodeCard = true;

  authobj : AuthEntity;

  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl : AlertController, private storage: StorageHelper,
    public loadingCtrl : LoadingController, private authProvider : AuthProvider,
    private configProvider: ConfigProvider,
    public viewCtrl : ViewController
    ) {
      
      this.storage.get('PhoneNumber')
      .then(
        (data) => {
            if(data !== null)
            {
              this.showPhoneCard = true;
              this.showCodeCard = false;
              this.phoneNumber = data;
            }
        }
      )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterCodePage');
  }

  codeValidate(){
    if (this.codeNumber.trim().length === 0)
    {
      this.showAlert('Información', 
        'Debe ingresar el código de verificación');
      return;
    }

    this.storage.set('CodeNumber', this.codeNumber);
    
    let loading = this.loadingCtrl.create({
      content: 'Cargando la información...'
    });
  
    loading.present();
    
    this.authProvider.startSession(this.phoneNumber, this.codeNumber)
    .then(data => {

      this.authobj = <AuthEntity>data;
      if(this.authobj !== null && this.authobj.excepcion !== undefined && this.authobj.excepcion.codigo === 0 && this.authobj.totalInstancias > 0)
      {
        this.storage.set('CodeNumber', this.codeNumber);
        this.storage.set('ApplicationID', this.authobj.resultados[0].CodigoAplicacion);
        this.storage.set('ClientID', this.authobj.resultados[0].CodigoCliente);
        this.storage.set('DeviceID', this.authobj.resultados[0].CodigoDispositivo);
        this.storage.set('ProjectID', this.authobj.resultados[0].CodigoProyecto);
        this.storage.set('DoormanPhoneNumber', this.authobj.resultados[0].NumeroMovilPortero);
        this.storage.set('Token', this.authobj.token);

        let resultData = { 
          "phoneNumber": this.authobj.resultados[0].NumeroMovil, 
          "tokenCode": this.authobj.token, 
          "projectCode": this.authobj.resultados[0].CodigoProyecto, 
          "clientCode": this.authobj.resultados[0].CodigoCliente, 
          "appCode": this.authobj.resultados[0].CodigoAplicacion 
        };

        this.viewCtrl.dismiss(resultData);  
              

      }else if(this.authobj.excepcion.codigo > 0) 
      {
        this.showAlert('Información', 
            'Validación de registro incorrecta. Intente nuevamente.');
        
        this.codeNumber = '';
      }

      loading.dismiss();

    }).catch( err => {
        loading.dismiss();

        this.showAlert('Error', 
          'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
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

  PhoneRegister(){
    if (this.phoneNumber.trim().length > 0){

      this.storage.set('PhoneNumber', this.phoneNumber.trim());
      this.storage.set('CodeNumber', this.codeNumber);
    
      let loading = this.loadingCtrl.create({
        content: 'Cargando la información...'
      });
    
      loading.present();

      this.authProvider.sendPhoneNumber(this.phoneNumber)
      .then(data => {
  
        this.showPhoneCard = true;
        this.showCodeCard = false;

        loading.dismiss();

        this.showAlert('Información', 
            'Revise su buzón SMS donde se encuentre el código de activación.');
        
      }).catch( err => {
  
          loading.dismiss();

          this.showAlert('Error', 
            'Ups!, algo no anda bien. Intenta nuevamente:' + err.message);
         }
      );

    }else{
      this.showAlert('Información', 
          'Debe ingresar el número del teléfono a registrar.');

    }

  }

  ViewUIDevice(){
    var uuiddevice = this.configProvider.getUUIDClearDevice();
    this.showAlert('ID dispositivo: ', uuiddevice );
  }

  resetCellphone()
  {
    this.phoneNumber =  "";
    this.codeNumber = "";

    this.showPhoneCard = false;
    this.showCodeCard = true;
    
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
