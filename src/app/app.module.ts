import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CircDetailPage } from '../pages/circ-detail/circ-detail';
import { PersonalAlertsPage } from '../pages/personal-alerts/personal-alerts';
// import { PqrsListPage } from '../pages/pqrs-list/pqrs-list';
import { CouponListPage } from '../pages/coupon-list/coupon-list'; 

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';

 //TODO: Cambiar el storage
 
// import { IonicStorageModule } from '@ionic/storage';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Device } from '@ionic-native/device/ngx';

import { Uid } from '@ionic-native/uid/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { AuthProvider } from '../providers/auth/auth';
import { StorageHelper } from '../helpers/storage-helper';
import { StorageEntity } from '../entities/storageEntity';

import { HttpClientModule } from '@angular/common/http';
import { ConfigProvider } from '../providers/config/config';
import { ComunicationServiceProvider } from '../providers/comunication-service/comunication-service';
import { DatabaseProvider } from '../providers/database/database';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CircDetailPageModule } from '../pages/circ-detail/circ-detail.module';
import { CouponListPageModule } from '../pages/coupon-list/coupon-list.module';
import { PersonalAlertsPageModule } from '../pages/personal-alerts/personal-alerts.module';
// import { PqrsListPageModule } from '../pages/pqrs-list/pqrs-list.module';

// import { OneSignal } from '@ionic-native/onesignal/ngx';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
    // CircDetailPage,
    // PersonalAlertsPage,
    // PqrsListPage
    // CouponListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    CircDetailPageModule,
    CouponListPageModule,
    PersonalAlertsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CircDetailPage,
    PersonalAlertsPage,
    // PqrsListPage,
    CouponListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // OneSignal,
    CallNumber,
    Device,
    Uid,
    SMS,
    StorageHelper,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ConfigProvider,
    ComunicationServiceProvider,
    DatabaseProvider,
    SQLite,
    SQLitePorter,
    StorageEntity
  ]
})
export class AppModule {}
