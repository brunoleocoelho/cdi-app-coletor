import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Contagem } from '../../models/Contagem';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { BackgroundMode } from '@ionic-native/background-mode';
import { UserHendHeld } from '../../models/UserHendHeld';
import { ContagemAcaoPage } from '../contagem-acao/contagem-acao';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ContagemListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-contagem-lista',
    templateUrl: 'contagem-lista.html',
})
export class ContagemListaPage {
    private ano: string = '2018';
    private contagens: Array<Contagem> = new Array<Contagem>();     //Todas as contagens
    private contagem: Contagem = null;                              //contagem selecionada
    private usuario: UserHendHeld;
    private loader: Loading

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private servico: ServiceApiProvider,
        private backgroundMode: BackgroundMode,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController

    ) {
        console.log('ContagemListaPage'); //linha teste
        this.backgroundMode.enable();
        // this.usuario = this.servico.getUsuarioLocal(); 

        // let contagensLista = this.servico.getContagensLocal();
        // if (contagensLista != null) {
        //     contagensLista.forEach(itemCont => {
        //         this.contagens.push(itemCont);
        //     });
        // }
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad ContagemListaPage');
        // this.usuario = this.servico.getUsuarioLocal();
        //CONTAGENS
        this.getContagens();
    }

    /** PREENCHENDO DADOS DAS CONTAGENS JÁ FEITAS ANTERIORMENTE*/
    private getContagens() {
        let contagensLista: any;

        this.createLodaing('Carregando Contagens')
        this.loader.present()

        // this.servico.getContagensTodas(this.usuario.usrName).subscribe(
        //     data => {
        //         contagensLista = data;
        //         contagensLista.Contagens.forEach(itemCont => {
        //             this.contagens.push(itemCont);
        //         });
        //         console.log("ContagemLista getContagens OK", this.contagens); //linha teste
        //         this.storeContagens();
        //     },
        //     err => {
        //         console.log("ContagemLista getContagens ERRO", err); //linha teste
        //         this.loader.dismiss()
        //         this.showAlertMessage('AVISO!', err.error.errorMessage);
        //     },
        //     ()=>{
        //         this.loader.dismiss();
        //     }
        // )
    }

    /** Exibe um elemento loading */
    private createLodaing(mensagem: string) {
        this.loader = this.loadingCtrl.create({
            spinner: 'dots',
            content: mensagem + '...'//'<ion-spinner name="dots">Fazendo Login...</ion-spinner>'
            // duration: 1000
        });
    }

    /** ARMAZENA AS CONTAGENS NO LOCAL STORAGE*/
    private storeContagens() {
        if (this.contagens != null) {
            // this.servico.saveContagensLocal(this.contagens);
            // console.log("ContagemLista storeContagens OK"); //linha teste
        }
        else
            console.log("ContagemLista storeContagens VAZIO"); //linha teste
    }

    /** MARCA A CONTAGEM ESCOLHIDA */
    //Chamado no HTML
    private checkContagem(item) {
        this.contagem = item;
        // console.log("CONTAGEM selecionada", this.contagem);//linha teste
    }

    /** Exibe um alerta de confirmação p/ prosseguir c/ abertura de contagem */
    //Chamado no HTML
    private showAlertConfirma() {

        if (this.contagem) {
            if (this.contagem.CCUSTO && this.contagem.CCUSTO.trim().length > 0) {

                let texto = '<br><b>' + this.contagem.CCUSTO +'-'+ this.contagem.CCDESC +'</b>'
                    + '<br>Local: <b>' + this.contagem.LOCAL + '</b>'
                    + '<br>Contagem: <b>#' + this.contagem.CONT + '</b>';

                const confirm = this.alertCtrl.create({
                    title: 'Prosseguir?',
                    message: 'Será iniciada contagem:' + texto,
                    buttons: [
                        { //Cancela
                            text: 'Cancelar',
                            handler: () => {
                                console.log('Cancelou abrir!');
                            }
                        },
                        { //Abre
                            text: 'Abrir',
                            handler: () => {
                                this.abreContagem();
                                console.log('Contagem sendo aberta e iniciada');
                            }
                        }
                    ]
                });
                confirm.present();
            }
            else {
                this.showAlertMessage('Escolha Inválida', 'Marque uma contagem para iniciá-la!');
            }
        }
    }

    /** ABRE UMA CONTAGEM */
    private abreContagem() {
        if (this.contagem != null) {
            let msg: any;

            this.createLodaing('Abrindo');
            this.loader.present();

            // this.servico.changeStatusContagem(this.contagem).subscribe(
            //     data => {
            //         msg = data;
            //         console.log('ContagemLista: ', msg.Mensagem)
            //         this.navCtrl.setRoot(ContagemAcaoPage, { contagem: this.contagem });
            //     },
            //     err => {
            //         msg = err;
            //         this.loader.dismiss()
            //         this.showAlertMessage(msg.error.errorCode, msg.error.errorMessage);
            //     },
            //     ()=>{
            //         this.loader.dismiss();
            //     }
            // )
        }
        else {
            this.showAlertMessage('Entrada Inválida', 'Selecione uma contagem para inicar!');
        }
    }

    /** Exibe alerta de confirmação ou erro */
    private showAlertMessage(titulo: string, mensagem: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
            buttons: [
                {
                    text: 'OK',
                    role: 'close',
                    handler: () => { }
                }
            ]
        });
        alert.present();
    }

    /** Define a cor do STATUS na tela */
    private setColor(statusNum) {
        switch (statusNum) {
            case '0':
                return 'lightyellow'; //Bloqueado
            case '1':
                return 'lightgreen'; //Liberado
            case '2':
                return 'lightblue'; //Em processo
            case '3':
                return 'lightgray'; //Suspenso
            case '9':
                return 'lightred'; //Encerrado
        }
    }

    /** EFETUA O LOGOFF DO APP */
    //Chamado no HTML
    private logOut() {
        let alert = this.alertCtrl.create({
            title: 'SAIR?',
            message: 'Será feito logoff!<br>Integrante: ' + this.usuario.nome,
            buttons: [
                { //Cancela
                    text: 'Cancelar',
                    handler: () => {
                        console.log('Cancelou SAIR!');
                    }
                },
                { //Abre
                    text: 'LOGOFF',
                    handler: () => {
                        // this.servico.removeDadosLocais();
                        this.navCtrl.setRoot(LoginPage);
                    }
                }
            ]
        });
        alert.present();
    }

}
