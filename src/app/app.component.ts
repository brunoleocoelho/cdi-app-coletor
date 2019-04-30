import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderColor } from '@ionic-native/header-color';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BackgroundMode } from "@ionic-native/background-mode";
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { HomeMenuPage } from '../pages/home-menu/home-menu';
import { LoginPage } from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = LoginPage;
    showSplash = true;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        screenOrientation: ScreenOrientation,
        backgroundMode: BackgroundMode,
        headerColor: HeaderColor,
        network: NetworkServiceProvider
    ) {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            backgroundMode.enable();
            splashScreen.hide();
            statusBar.backgroundColorByHexString('#BB013a70');
            headerColor.tint('#013a70');
            // window.setTimeout(
            //     () => { this.showSplash = false },
            //     3000
            // )

            // console.log('Plataforma', platform); //linha teste
            if (platform.is('cordova')) {
                //  (platform.is('ios') || platform.is('android')) 
                console.log('Plataforma desktop browser'); //linha teste
                screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            else {
                console.log('Plataforma desktop browser'); //linha teste
            }

        });

        platform.registerBackButtonAction(null);
    }
}

