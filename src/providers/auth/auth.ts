
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

import { ConfigProvider } from '../../providers/config/config';
import { AuthEntity } from '../../entities/authEntity';

// import { config } from 'rxjs';

@Injectable()
export class AuthProvider {
  autobj : AuthEntity;

  constructor(
    public http: HttpClient,
    private configProvider: ConfigProvider
    ) 
  {
    
  }

  startSession(cellphone : string, shorCode : string) {

    let postData = {
            "numeroMovil": cellphone,
            "codigoAutorizacion": shorCode,
            "credencial": this.configProvider.getUUIDDevice()
    }

    console.log('Token: ');
    console.log(postData);

    return new Promise((resolve, reject) => {
      this.http.post(this.configProvider.ServerURL + this.configProvider.AuthURL + this.configProvider.generateUUID(), 
            postData, { responseType: 'json' }  ) 
        .timeout(15000)
        .subscribe(res => {
            
            resolve(res);
        }, (err) => {

            reject(err);
        });
    });

  } 
  
  sendPhoneNumber(number : string) {

    let postData = {
            "numeroMovil": number,
            "credencial": this.configProvider.getUUIDDevice()
    }

    console.log(JSON.stringify(postData));
    return new Promise((resolve, reject) => {
      this.http.post(this.configProvider.ServerURL + this.configProvider.SmsURL + this.configProvider.generateUUID(), 
        postData, { responseType: 'json' }  ) 
        .timeout(15000)
        .subscribe(res => {
           console.log('ingreso');
           console.log(res);  
            resolve(res);
        }, (err) => {

            reject(err);
        });
    });

  }


}
