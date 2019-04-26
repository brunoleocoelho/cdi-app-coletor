import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContagemListaPage } from './contagem-lista';

@NgModule({
  declarations: [
    ContagemListaPage,
  ],
  imports: [
    IonicPageModule.forChild(ContagemListaPage),
  ],
})
export class ContagemListaPageModule {}
