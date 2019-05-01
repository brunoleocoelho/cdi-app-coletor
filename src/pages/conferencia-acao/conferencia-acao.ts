import { Component } from '@angular/core';
import { 
    IonicPage, NavController, NavParams, AlertController, 
    ModalController, Loading, LoadingController
} from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { ServiceStorageProvider } from '../../providers/service-storage/service-storage';
import { LeituraConferenciaPage } from './leitura-conferencia/leitura-conferencia';
import { HomeMenuPage } from '../home-menu/home-menu';
import { UserHandHeld } from '../../models/UserHandHeld';

/**
 * Classe responsável por ler do usuário a Ordem de Separaçaõ para conferencia
 */
@IonicPage()
@Component({
    selector: 'page-conferencia-acao',
    templateUrl: 'conferencia-acao.html',
})
export class ConferenciaAcaoPage {
    private titulo = 'Conferência Ordem Separação';
    private usuario: UserHandHeld = new UserHandHeld();
    private loader: Loading;
    private ordSep: string;
    private disableBtnAbrir: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private servico: ServiceApiProvider,
        private storage: ServiceStorageProvider,
        private alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private loadingCtrl: LoadingController

    ) {
        console.log("ConferenciaAcaoPage");
        this.storage.getUserLocal()
            .then( data => this.usuario = data )
        this.resetFields()
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad ContagemAcaoPage');
    }
    
    ionViewWillEnter() {
        // console.log('ionViewWillEnter ContagemAcaoPage');
        this.resetFields()
    }
    
    /** Limpa os dados dos campos na tela */
    private resetFields(){
        this.disableBtnAbrir = true;
        this.ordSep = ''
    }

    /** Mostra um modal para leitura com o código de barras */
    // chamado também pelo HTML
    public exibirModalLeitura() {
        let profileModal = this.modalCtrl.create( 
            LeituraConferenciaPage, 
            { OrdSep: this.ordSep } 
        );

        // dados pode ser recebidos ao voltar do modal de leitura do produto
        profileModal.onDidDismiss(
            data => this.resetFields()
        );

        profileModal.present();
    }

    /** Exibe um elemento loading */
    private createLodaing(mensagem: string) {
        this.loader = this.loadingCtrl.create({
            spinner: 'dots',
            content: mensagem + '...'//'<ion-spinner name="dots">Fazendo Login...</ion-spinner>'
            // duration: 1000
        });
    }

    /** Exibe mensagem de saída da contagem */
    // chamado pelo HTML
    public sairConferencia(acao:string) {
        this.navCtrl.setRoot(HomeMenuPage);
    }
    
    /** Exibe alerta de confirmação ou erro */
    private showAlertMessaage(titulo: string, mensagem: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
            buttons: [
                { text: 'OK', role: 'cancel', handler: () => { } }
            ]
        });
        alert.present();
        //Definindo timeout para mensagem OK
        if (titulo == 'OK') {
            window.setTimeout(
                ()=>{ alert.dismiss(); },
                500
            )
        }
    }

    /** Chama o serviço de inclusão de um item contado na base */
    private abrirConferencia(){
        this.createLodaing('Postando item');
        this.loader.present();
        let resp: any;

        this.servico.postConfereOrdemSeparacao(this.ordSep).subscribe(
            data => {
                resp = data;
                this.loader.dismiss();
                switch (resp.status) {
                    case 'OK':
                        this.exibirModalLeitura()
                        break;
                
                    case 'ERRO':
                        // let erroTexto = resp.erro.join('<br>')
                        this.showAlertMessaage('Algo de errado!', resp.erro);
                        break;
                }
            },
            erro => {
                this.loader.dismiss();
                if (erro.error.errorMessage) {
                    this.showAlertMessaage('Ops!', erro.error.errorMessage);
                }
                else {
                    this.showAlertMessaage('Erro', erro.statusText);
                }
            }
        )
    }

}

// /** Estilo especial para a tela de conferencia */
// const style = {
//     centralizado: {
//         height: '100%',
//         color: 'lightgray',
//         'justify-content': 'center',
//         display: 'flex',
//         'align-items': 'center'
//     }
// }
