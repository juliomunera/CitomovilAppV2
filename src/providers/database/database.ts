
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DatabaseProvider {

  public database: SQLiteObject;
  public dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, public sqlite: SQLite, private http: HttpClient) { 
    this.plt.ready().then(()=> {
      this.sqlite.create({
        name: 'citomovil.db',
        location: 'default'        
      })
      .then((db:SQLiteObject)=> {
          this.database = db;
          this.seedDatabase();
      })
    });
  }

  seedDatabase() {

    this.http.get('assets/database.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.dbReady.next(true);
        })
        .catch(e => { alert(e.message); });
    });
  }

}
