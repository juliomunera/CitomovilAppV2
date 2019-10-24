import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PqrsListPage } from './pqrs-list';

@NgModule({
  declarations: [
    PqrsListPage,
  ],
  imports: [
    IonicPageModule.forChild(PqrsListPage),
  ],
})
export class PqrsListPageModule {}
