import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferenciaAcaoPage } from './conferencia-acao';
import { LeituraConferenciaPage } from './leitura-conferencia/leitura-conferencia';

@NgModule({
  declarations: [
    ConferenciaAcaoPage,
    LeituraConferenciaPage
  ],
  imports: [
    IonicPageModule.forChild(ConferenciaAcaoPage),
  ],
  entryComponents: [
    LeituraConferenciaPage
  ]
})
export class ContagemAcaoPageModule {}
