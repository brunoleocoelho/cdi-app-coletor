import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { BackgroundMode } from '@ionic-native/background-mode';
import { Keyboard } from "@ionic-native/keyboard";
import { HeaderColor } from '@ionic-native/header-color';
import { Network } from "@ionic-native/network";
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { ServiceApiProvider } from '../providers/service-api/service-api';
import { NetworkServiceProvider } from '../providers/network-service/network-service';

import { LoginPage } from '../pages/login/login';
import { HomeMenuPage } from '../pages/home-menu/home-menu';
import { LeituraConferenciaPage } from '../pages/leitura-conferencia/leitura-conferencia';
import { ServiceStorageProvider } from '../providers/service-storage/service-storage';
// import { ContagemListaPage } from '../pages/contagem-lista/contagem-lista';
// import { ContagemAcaoPage } from '../pages/contagem-acao/contagem-acao';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomeMenuPage,
    LeituraConferenciaPage,
    // ContagemListaPage,
    // ContagemAcaoPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{ navExitApp: false }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomeMenuPage,
    LeituraConferenciaPage,
    // ContagemListaPage,
    // ContagemAcaoPage,
    // LeituraConferenciaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    BarcodeScanner,
    ScreenOrientation,
    BackgroundMode,
    Keyboard,
    HeaderColor,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    NetworkServiceProvider,
    ServiceApiProvider,
    ServiceStorageProvider
  ]
})
export class AppModule {}

// Prevent the back button to close the app
// http://www.damirscorner.com/blog/posts/20170929-HandlingHardwareBackButtonInIonic.html