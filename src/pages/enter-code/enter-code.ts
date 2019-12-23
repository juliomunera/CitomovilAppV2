
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AuthEntity } from '../../entities/authEntity';
import { ConfigProvider } from '../../providers/config/config';
import { DatabaseProvider } from '../../providers/database/database';
import { StorageHelper } from '../../helpers/storage-helper';
import { StorageEntity } from '../../entities/storageEntity';

@IonicPage()
@Component({
  selector: 'page-enter-code',
  templateUrl: 'enter-code.html',
})
export class EnterCodePage {

  public phoneNumber: any = "";
  public codeNumber: string = "";
  public showPhoneCard: boolean = false;
  public showCodeCard = true;

  authobj : AuthEntity;
  users : any;
  result : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl : AlertController, 
    public loadingCtrl : LoadingController, private authProvider : AuthProvider,
    private configProvider: ConfigProvider,
    public database : DatabaseProvider,
    public viewCtrl : ViewController,
    public storageInfo : StorageEntity,
    public storageHelper : StorageHelper
    ) {

    }

  ngOnInit() {
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
    
    let loading = this.loadingCtrl.create({
      content: 'Cargando la información...'
    });
  
    loading.present();
    
    this.authProvider.startSession(this.phoneNumber, this.codeNumber)
    .then(data => {

      this.authobj = <AuthEntity>data;
      if(this.authobj !== null && this.authobj.excepcion !== undefined && this.authobj.excepcion.codigo === 0 && this.authobj.totalInstancias > 0)
      {

        let info : StorageEntity;
        info = new StorageEntity();

        let phone = this.phoneNumber;
        if (phone === undefined || phone === '')
          phone = this.authobj.resultados[0].NumeroMovil;

        info.CodeNumber = this.codeNumber;
        info.ApplicationID = this.authobj.resultados[0].CodigoAplicacion;
        info.ClientId = this.authobj.resultados[0].CodigoCliente;
        info.DeviceID =  this.authobj.resultados[0].CodigoDispositivo;
        info.ProjectID = this.authobj.resultados[0].CodigoProyecto;
        info.DoormanPhoneNumber = this.authobj.resultados[0].NumeroMovilPortero;
        info.Token = this.authobj.token;
        info.PhoneNumber = phone;

        console.log(info);

        this.storageHelper.updateStoreData(info)
        .then(()=> {

          let resultData = { 
            "ApplicationId": this.authobj.resultados[0].CodigoAplicacion,
            "phoneNumber": phone, 
            "tokenCode": this.authobj.token, 
            "projectCode": this.authobj.resultados[0].CodigoProyecto, 
            "clientCode": this.authobj.resultados[0].CodigoCliente, 
            "appCode": this.authobj.resultados[0].CodigoAplicacion,
            "doormanPhoneNumber" : this.authobj.resultados[0].NumeroMovilPortero
          };
  
          this.viewCtrl.dismiss(resultData);  
        })
        .catch(e=> {
          this.showAlert('Error', 
          'Ups!, algo no anda bien. Intenta de nuevo.');
        });

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
          'Ups!, algo no anda bien. Intenta nuevamente!');
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

      this.storageHelper.insertFirstData(this.phoneNumber.trim())
      .then(()=> {

        let loading = this.loadingCtrl.create({
          content: 'Cargando la información...'
        });
      
        loading.present();
  
        this.authProvider.sendPhoneNumber(this.phoneNumber)
        .then(data => {
    
          this.showPhoneCard = true;
          this.showCodeCard = false;
          console.log(data);
  
          loading.dismiss();
  
          this.showAlert('Información', 
              'Revise su buzón SMS donde se encuentre el código de activación.');
          
        }).catch( err => {
    
            loading.dismiss();
  
            this.showAlert('Información', 
              'Ups!, verifica el número e intenta nuevamente.');
           }
        );

        
      })
      .catch(e=> {
        alert(e.message);
      });

    }else{
      this.showAlert('Información', 
          'Debe ingresar el número del teléfono a registrar.');
    }

  }

  ViewUIDevice(){
    var uuiddevice = this.configProvider.getUUIDClearDevice();
    this.showAlert('ID dispositivo: ', uuiddevice );
  }

  async resetCellphone()
  {
    this.phoneNumber =  "";
    this.codeNumber = "";

    this.showPhoneCard = false;
    this.showCodeCard = true;
    
    await this.storageHelper.clearStoreData()
    .then(()=> {
      console.log('Registros eliminados!');
    })
  }

}
