
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Device } from '@ionic-native/device/ngx';

@Injectable()
export class ConfigProvider {
  uuidValue : string;

  // public ServerURL : string = 'http://191.91.157.113:12000/citomovil';
  // public AuthURL : string = '/v1/api2019/seguridad/iniciosesion?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  // public SmsURL : string = '/v1/api2019/seguridad/solicitudacceso?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud='; // SMS

  // // InicioSesion

  // public LastComunicationURL : string = '/v1/api2019/comunicaciones?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  // public AllGroupsMessageURL : string = '/v1/api2019/comunicaciones/grupales?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  // public AllSingleMessageURL : string = '/v1/api2019/comunicaciones/individuales?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  // public TotalUnreadMsgURL : string = '/v1/api2019/comunicaciones/totales?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  // public MarkMessageURL : string = '/v1/api2019/comunicaciones/individuales/marcacion?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';

  public ServerURL : string = 'https://www.citomovil.com/test-restsvc';
  public AuthURL : string = '/api2019/seguridad/iniciosesion?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  public SmsURL : string = '/api2019/seguridad/solicitudacceso?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud='; // SMS

  // InicioSesion

  public LastComunicationURL : string = '/api2019/comunicaciones?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  public AllGroupsMessageURL : string = '/api2019/comunicaciones/grupales?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  public AllSingleMessageURL : string = '/api2019/comunicaciones/individuales?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  public TotalUnreadMsgURL : string = '/api2019/comunicaciones/totales?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';
  public MarkMessageURL : string = '/api2019/comunicaciones/individuales/marcacion?codigoAPI=779e0ea2-bb03-4a31-98a1-24bceea93946&idSolicitud=';

  constructor(private device: Device) {
  }

  public generateUUID() : String {
    this.uuidValue=UUID.UUID();
    return this.uuidValue;
  }
  
  public getUUIDDevice() : string {
    let result = '';
    if (this.device.platform === 'browser') {
      result = btoa('0000000000');
    } else {
      result = btoa(this.device.uuid); // + ' - ' + this.device.serial + ' - ' + this.device.manufacturer + ' - ' + this.device.model;
    }

    return result;
  }

  public getUUIDClearDevice() : string {
    let result = '';
    if (this.device.platform === 'browser') {
      result = '0000000000';
    } else {
      result = this.device.uuid;
    }

    return result;

  }

}
