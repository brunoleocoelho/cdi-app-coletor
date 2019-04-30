import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeituraConferenciaPage } from './leitura-conferencia';

@NgModule({
  declarations: [
    LeituraConferenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(LeituraConferenciaPage),
  ],
})
export class LeituraConferenciaPageModule {}
