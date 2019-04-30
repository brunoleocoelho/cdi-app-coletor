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
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';

import { ServiceApiProvider } from '../providers/service-api/service-api';
import { NetworkServiceProvider } from '../providers/network-service/network-service';

import { LoginPage } from '../pages/login/login';
import { HomeMenuPage } from '../pages/home-menu/home-menu';
import { ServiceStorageProvider } from '../providers/service-storage/service-storage';
import { ContagemAcaoPageModule } from '../pages/conferencia-acao/conferencia-acao.module';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomeMenuPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{ navExitApp: false }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ContagemAcaoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomeMenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    ScreenOrientation,
    BarcodeScanner,
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