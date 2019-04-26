
import { Injectable } from '@angular/core';
import { Network } from "@ionic-native/network";
import { ToastController } from 'ionic-angular';

/*
  Generated class for the NetworkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkServiceProvider {
    private status: boolean;

    constructor(
        private network: Network,
        private toast: ToastController
    ) {
        console.log('NetworkServiceProvider started!');

        this.network.onDisconnect().subscribe(
            data => {
                // console.log('Desconectado', data); //linha teste
                this.status = false;
                this.toast.create({
                    message: 'Rede DESCONECTADA',
                    duration: 5000,
                    cssClass: 'conexaoOut',
                    showCloseButton: true,
                    closeButtonText: "OK",
                }).present();
            }
        );

        this.network.onConnect().subscribe(
            data => {
                setTimeout(() => {
                    // console.log('Conectado', data); //linha teste
                    this.status = false;
                    this.toast.create({
                        message: 'Rede CONECTADA ('+ this.network.type +')',
                        duration: 5000,
                        cssClass: 'conexaoOk',
                        showCloseButton: true,
                        closeButtonText: "OK",
                }).present();
                }, 1000);
            }
        );
    }

    /** Retorna o status de conexão da rede */
    public getNetworkStatus(): boolean {
        return this.status;
    }

}
