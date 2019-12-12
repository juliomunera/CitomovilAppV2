import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { TabsPage } from '../pages/tabs/tabs';

// import { OneSignal } from '@ionic-native/onesignal/ngx';

// firebase key: d7cfab2b-870d-4519-af49-979c49af1dad
// https://www.youtube.com/watch?v=K6zPzPFiMIY
// https://documentation.onesignal.com/docs/generate-an-ios-push-certificate
// https://devdactic.com/push-notifications-ionic-onesignal/
// https://console.firebase.google.com/project/citomovil-ionic/notification/reporting
// https://blog.ng-classroom.com/blog/ionic2/ionic-and-onesignal/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  signal_app_id:string = 'd7cfab2b-870d-4519-af49-979c49af1dad';
  firebase_id:string = '1042636661130';

  constructor(platform: Platform, public statusBar : StatusBar, 
    public splashScreen : SplashScreen, 
    // public oneSignal: OneSignal,
    public alertCtrl : AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       statusBar.styleDefault();
       splashScreen.hide();


      //  oneSignal.startInit(this.signal_app_id, this.firebase_id);

      //  oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
       
      //  oneSignal.handleNotificationReceived().subscribe((res) => {
      //   console.log(res);
      //  });
       
      //  this.oneSignal.handleNotificationOpened().subscribe((res) => {
      //    console.log(res);
      //    var obj = JSON.stringify(res);
      //  });


      //  this.oneSignal.getIds().then((id) => {
      //   console.log(id);
      //   let alert = this.alertCtrl.create({
      //       title: 'Ya tengo el playerId',
      //       message: JSON.stringify(id),
      //       buttons: [{
      //         text: 'Ok',
      //         role: 'ok'
      //       }]
      //     });
      //     alert.present();
      // });
       
      //  this.oneSignal.endInit();

    });
  }
}
