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
import { PqrsListPage } from '../pages/pqrs-list/pqrs-list';
import { CouponListPage } from '../pages/coupon-list/coupon-list'; 

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

// import { CallNumber } from '@ionic-native/call-number';

import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device/ngx';

import { Uid } from '@ionic-native/uid/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { AuthProvider } from '../providers/auth/auth';
import { StorageHelper } from '../helpers/storage-helper';

import { HttpClientModule } from '@angular/common/http';
import { ConfigProvider } from '../providers/config/config';
import { ComunicationServiceProvider } from '../providers/comunication-service/comunication-service';

// import { OneSignal } from '@ionic-native/onesignal/ngx';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CircDetailPage,
    PersonalAlertsPage,
    PqrsListPage,
    CouponListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    IonicStorageModule.forRoot()
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
    PqrsListPage,
    CouponListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // OneSignal,
    // CallNumber,
    Device,
    Uid,
    SMS,
    StorageHelper,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ConfigProvider,
    ComunicationServiceProvider
  ]
})
export class AppModule {}
