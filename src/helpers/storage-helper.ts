
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({})
  export class StorageHelper {
  
    constructor(private storage : Storage) {
    
    }

    public set(settingName,value){
        return this.storage.set(`setting:${ settingName }`, value);
      }
   
      public async get(settingName){
        return await this.storage.get(`setting:${ settingName }`);
      }
     
      public async remove(settingName){
       return await this.storage.remove(`setting:${ settingName }`);
      }
   
      public clear() {
       this.storage.clear().then(() => {
         console.log('all keys cleared');
        });
      }

} 