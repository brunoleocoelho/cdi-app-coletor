import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContagemAcaoPage } from './contagem-acao';

@NgModule({
  declarations: [
    ContagemAcaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ContagemAcaoPage),
  ],
})
export class ContagemAcaoPageModule {}
