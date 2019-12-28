import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

import { ConfigProvider } from '../../providers/config/config';
import { LastComEntity } from '../../entities/LastComEntity';
// import { StorageHelper } from '../../helpers/storage-helper';

@Injectable()
export class ComunicationServiceProvider {

  responseEntity : LastComEntity;

  public phoneNumber : any;
  public codeNumber: any;
  public tokenCode: any;
  public appCode: any;
  public projectCode: any;
  public clientCode: any;

  //TODO: Cambiar el storage

  constructor(
    public http: HttpClient,
    private configProvider: ConfigProvider
    //private storage: StorageHelper
    ) 
  {
  }

  getLastComunication(phoneNumber, clientCode, projectCode, appCode, tokenCode) {

    let postData = {
            "numeroMovil": phoneNumber,
            "codigoCliente": clientCode,
            "codigoProyecto": projectCode,
            "codigoAplicacion": appCode,
            "token": tokenCode
    } 
    console.log(postData);

    return new Promise((resolve, reject) => {
      this.http.post(this.configProvider.ServerURL + this.configProvider.LastComunicationURL + this.configProvider.generateUUID(), 
            postData, { responseType: 'json' }  ) 
        .timeout(10000)
        .subscribe(res => {
            
            resolve(res);
        }, (err) => {
            reject(err);
        });
    });

  }

  getAllGroupsMessages(phoneNumber, clientCode, projectCode, appCode, tokenCode) {

    let postData = {
        "numeroMovil": phoneNumber,
        "codigoCliente": clientCode,
        "codigoProyecto": projectCode,
        "codigoAplicacion": appCode,
        "token": tokenCode
    }  

    return new Promise((resolve, reject) => {
      this.http.post(this.configProvider.ServerURL + this.configProvider.AllGroupsMessageURL + this.configProvider.generateUUID(), 
        postData, { responseType: 'json' }  ) 
        .timeout(10000)
        .subscribe(res => {
            
            resolve(res);
        }, (err) => {

            reject(err);
        });
    });
  }

  getAllSingleMessages(phoneNumber, clientCode, projectCode, appCode, tokenCode) {

    let postData = {
      "numeroMovil": phoneNumber,
      "codigoCliente": clientCode,
      "codigoProyecto": projectCode,
      "codigoAplicacion": appCode,
      "token": tokenCode
  }  

    return new Promise((resolve, reject) => {
      this.http.post(this.configProvider.ServerURL + this.configProvider.AllSingleMessageURL + this.configProvider.generateUUID(), 
        postData, { responseType: 'json' }  ) 
        .timeout(10000)
        .subscribe(res => {
            
            resolve(res);
        }, (err) => {

            reject(err);
        });
    }); 
  }

  getUnReadMessages(phoneNumber, clientCode, projectCode, appCode, tokenCode) {

    let postData = {
        "numeroMovil": phoneNumber,
        "codigoCliente": clientCode,
        "codigoProyecto": projectCode,
        "codigoAplicacion": appCode,
        "token": tokenCode
    }  
    
    return new Promise((resolve, reject) => {
      this.http.post(this.configProvider.ServerURL + this.configProvider.TotalUnreadMsgURL + this.configProvider.generateUUID(), 
        postData, { responseType: 'json' }  ) 
        .timeout(10000)
        .subscribe(res => {
            
            resolve(res);
        }, (err) => {

            reject(err);
        });
    }); 
  }


  markMessages(codigoComunicacion : string, typeNotification : string, numeroMovil: string, token : string) {
    let postData = {
        "numeroMovil": numeroMovil,
        "codigoComunicacion": codigoComunicacion,
        "token": token
    }  

    return new Promise((resolve, reject) => {
      
      let endpointUrl : string;
      if (typeNotification === 'I')
        endpointUrl = this.configProvider.MarkMessageURL;
      else 
        endpointUrl = this.configProvider.MarkMessageGURL;;

      this.http.post(this.configProvider.ServerURL + endpointUrl + this.configProvider.generateUUID(), 
        postData, { responseType: 'json' }  ) 
        .timeout(10000)
        .subscribe(res => {
            
            resolve(res);
        }, (err) => {

            reject(err);
        });
    }); 
  }
  

}
