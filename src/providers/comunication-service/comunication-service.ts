import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

import { ConfigProvider } from '../../providers/config/config';
import { LastComEntity, PostEntity } from '../../entities/LastComEntity';
import { StorageHelper } from '../../helpers/storage-helper';

@Injectable()
export class ComunicationServiceProvider {

  responseEntity : LastComEntity;

  public phoneNumber : string;
  public codeNumber: string;
  public tokenCode: string;
  public appCode: string;
  public projectCode: string;
  public clientCode: string;

  constructor(
    public http: HttpClient,
    private configProvider: ConfigProvider,
    private storage: StorageHelper
    ) {

      this.storage.get('ClientID')
      .then(
        (data) => {
            if(data !== null)
            {
              this.clientCode = data;
            }
        }
      );

      this.storage.get('CodeNumber')
      .then(
        (data) => {
            if(data !== null)
            {
              this.codeNumber = data;
            }
        }
      );

      this.storage.get('PhoneNumber')
      .then(
        (data) => {
            if(data !== null)
            {
              this.phoneNumber = data;
            }
        }
      );

      this.storage.get('Token')
      .then(
        (data) => {
            if(data !== null)
            {
              this.tokenCode = data;
            }
        }
      );

      this.storage.get('ApplicationID')
      .then(
        (data) => {
            if(data !== null)
            {
              this.appCode = data;
            }
        }
      );

      this.storage.get('ProjectID')
      .then(
        (data) => {
            if(data !== null)
            {
              this.projectCode = data;
            }
        }
      );
  }

  getLastComunication() {

    let postData = {
            "numeroMovil": this.phoneNumber,
            "codigoCliente": this.clientCode,
            "codigoProyecto": this.projectCode,
            "codigoAplicacion": this.appCode,
            "token": this.tokenCode
    } 

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


  getAllGroupsMessages(postInfo : PostEntity) {

    let postData = {
        "numeroMovil": this.phoneNumber,
        "codigoCliente": this.clientCode,
        "codigoProyecto": this.projectCode,
        "codigoAplicacion": this.appCode,
        "token": this.tokenCode
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

  getAllSingleMessages(postInfo : PostEntity) {

    let postData = {
        "numeroMovil": this.phoneNumber,
        "codigoCliente": this.clientCode,
        "codigoProyecto": this.projectCode,
        "codigoAplicacion": this.appCode,
        "token": this.tokenCode
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

  getUnReadMessages(postInfo : PostEntity) {
    let postData = {
        "numeroMovil": this.phoneNumber,
        "codigoCliente": this.clientCode,
        "codigoProyecto": this.projectCode,
        "codigoAplicacion": this.appCode,
        "token": this.tokenCode
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


  markMessages(codigoComunicacion : string, typeNotification : string) {
    let postData = {
        "numeroMovil": this.phoneNumber,
        "codigoComunicacion": codigoComunicacion,
        "token": this.tokenCode
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
