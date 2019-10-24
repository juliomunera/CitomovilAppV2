import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalAlertsPage } from './personal-alerts';

@NgModule({
  declarations: [
    PersonalAlertsPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalAlertsPage),
  ],
})
export class PersonalAlertsPageModule {}
