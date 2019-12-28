
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { StorageEntity } from '../entities/storageEntity';

@Injectable()
  export class StorageHelper {
  
    private database: SQLiteObject;
    public storage : StorageEntity;

    constructor(private plt: Platform, private sqlite: SQLite) {
 
      this.plt.ready().then(() => {
        this.sqlite.create({
          name: 'citomovil.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
        
            this.database = db;
        });
      });
    
    }

    insertFirstData(phoneNumber){
      return this.plt.ready()
      .then(()=>{
        return this.database.executeSql(
          `DELETE FROM SettingsData`
        , [])
        .then(()=> {

          return this.database.executeSql(`INSERT INTO SettingsData (PhoneNumber) VALUES (?)`, [phoneNumber])
          .catch(e=>alert(e.message));
        })
      })
      .catch(e=> alert(e.message));
    }

    getStoreData(){
      
      return this.plt.ready()
        .then(()=> {

          return this.database.executeSql(
            `SELECT id, PhoneNumber, CodeNumber, ApplicationID, DeviceID, ClientID, ProjectID, DoormanPhoneNumber, Token FROM SettingsData`, [])
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
              }
     
            }

            return entityResult;

          })
          .catch((err)=>alert(err.message));
        })
        .catch(e=> alert(e.message));
    }

    updateStoreData(data : StorageEntity){
      
      return this.plt.ready()
        .then(()=> {

          let params = [data.ClientId, data.PhoneNumber, data.CodeNumber, data.ApplicationID, data.DeviceID, data.ProjectID, data.DoormanPhoneNumber, data.Token];

          return this.database.executeSql(
            `UPDATE SettingsData SET ClientID = ? , PhoneNumber = ?, CodeNumber = ?, ApplicationID = ?, DeviceID = ?, ProjectID = ?, DoormanPhoneNumber = ?, Token = ? `
          , params)
          .then(res => {
            console.log('Fila actualizada.');
          })
          .catch((err)=>alert(err.message));
        })
        .catch(e=> alert(e.message));
    }
   
    clearStoreData(){
      
      return this.plt.ready()
        .then(()=> {

          return this.database.executeSql(
            `DELETE FROM SettingsData`
          , [])
          .catch((err)=>alert(err.message));
        })
        .catch(e=> alert(e.message));
    }

} 