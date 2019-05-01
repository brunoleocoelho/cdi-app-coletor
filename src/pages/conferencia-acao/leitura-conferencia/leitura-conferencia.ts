import { ThrowStmt } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import {
    NavController, NavParams, AlertController, ActionSheetController,
    ViewController, TextInput, Loading, LoadingController, AlertButton, ActionSheetButton
} from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
// import { Keyboard } from "@ionic-native/keyboard";
import { ServiceApiProvider } from '../../../providers/service-api/service-api';
import { Produto } from '../../../models/Produto';

/** 
 * Classe responsável pela leitura com código de barras da conferencia
 */
// @IonicPage()
@Component({
    selector: 'page-leitura-conferencia',
    templateUrl: 'leitura-conferencia.html',
})
export class LeituraConferenciaPage {
    @ViewChild('inputQtd') inputQtd: TextInput; //input do HTML referenciado no TypeScript

    private produto: Produto;
    private ordSep: string;
    private loader: Loading;
    private achouItem: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private actionSheetCtrl: ActionSheetController,
        private servico: ServiceApiProvider,
        private barcodeScanner: BarcodeScanner,
        // private keyboard: Keyboard,
        private loadingCtrl: LoadingController
    ) {
        // console.log('LeituraConfrencia contagem:', this.contagem);//linha teste
        this.ordSep = this.navParams.get('OrdSep');
        this.resetFields();
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad LeituraConferenciaPage');
        // this.keyboard.hide();
        this.lerCodigoBarras();
    }

    /** Limpa os dadoscampos  */
    private resetFields() {
        this.produto = new Produto();
        this.achouItem = false;
    }

    /** CHAMA O LEITOR DE CODIGO DE BARRAS P/ LEITURA */
    private lerCodigoBarras() {
        this.barcodeScanner.scan({
            orientation: 'portrait',                            //orientação de tela: landscape ou portrait
            showTorchButton: true,                              //botão de luz
            prompt: 'Posicione o leitor no codigo de barras',   //texto exibido na leitura de código de barras
            resultDisplayDuration: 700                          //tempo exibição leitura
        })
            .then(barcodeData => {
                // console.log('lerCodigoBarras data', barcodeData);
                let codigo = barcodeData.text.trim();
                if (codigo && codigo.length > 0) {
                    this.checkItemContado(codigo);
                }
            })
            .catch(err => {
                console.log('lerCodigoBarras err', err);
            });
    }

    /** Chama o serviço que verifica se produto está correto */
    private checkItemContado(item: string) {
        let resp: any;
        this.createLoading('Verificando item');
        this.loader.present();

        this.servico.getProdutoInfo(item).subscribe(
            data => {
                // console.log('LeituraConfrencia CheckItemContado OK:', data); //linha teste
                this.loader.dismiss();
                this.achouItem = true;
                resp = data;

                switch (resp.status) {
                    case 'OK':
                        // this.showAlertMessage('GetItemContado', JSON.stringify(dados)); //linha teste
                        this.produto.CODIGO = item;
                        this.produto.DESCRICAO = resp.Produto.DESCRICAO;
                        this.produto.UM = resp.Produto.UM;
                        window.setTimeout(
                            () => this.inputQtd._jsSetFocus(),
                            700
                        )
                        break;

                    case 'ERRO':
                        // let erroTexto = resp.erro.join('<br>')
                        this.showAlertMessage('Algo errado!', resp.erro)
                        break;
                }
            },
            erro => {
                //console.log('LeituraConfrencia CheckItemContado ERRO:', erro);
                this.loader.dismiss();
                this.achouItem = false;
                if (erro.error.errorMessage) {
                    this.showAlertMessage('ERRO', erro.error.errorMessage);
                } else {
                    this.showAlertMessage('ERRO', erro.statusText);
                }
            }
        )
    }

    /** Exibe um elemento loading */
    private createLoading(mensagem: string) {
        this.loader = this.loadingCtrl.create({
            spinner: 'dots',
            content: mensagem + '...'//'<ion-spinner name="dots">Fazendo Login...</ion-spinner>'
            // duration: 1000
        });
    }

    /** Sai da tela de leitura */
    public voltar() {
        console.log('LeituraConferencia voltar apertado!');

        const titulo = `Deseja encerrar a conferência da O.S. ${this.ordSep}?`;
        const botoes = [
            { text: 'Cancelar', icon:'undo', role: 'cancel', handler: () => { } },
            { text: 'Não', icon:'thumbs-down', handler: () => this.viewCtrl.dismiss() },
            { text: 'Sim', icon:'thumbs-up', handler: () => this.encerrar() },
        ];

        //this.showAlertMessage('', titulo, botoes)
        this.presentActionSheet(titulo, botoes)
    }

    /** Confirma o produto contado */
    public confirmar() {
        if (this.achouItem && this.produto.QUANT > 0) {
            this.createLoading('Postando item');
            this.loader.present();

            console.log('LeituraConferencia confirmar', this.produto);
            let resp: any;

            this.servico.postItemConferencia(this.ordSep, this.produto).subscribe(
                data => { //sucesso
                    this.loader.dismiss();
                    resp = data;
                    switch (resp.status) {
                        case 'OK':
                            this.resetFields()
                            break;

                        case 'ERRO':
                            // let erroTexto = resp.erro.join('<br>')
                            this.showAlertMessage('Algo está errado!', resp.erro);
                            break;
                    }
                },
                erro => {
                    //console.log('LeituraConfrencia CheckItemContado ERRO:', erro);
                    this.loader.dismiss();
                    if (erro.error.errorMessage) {
                        this.showAlertMessage('ERRO', erro.error.errorMessage);
                    } else {
                        this.showAlertMessage('ERRO', erro.statusText);
                    }
                }
            )
        }
        else {
            this.showAlertMessage('Opa!', 'Você não contou nenhum item!<br>Deve ler o Código do Produto e digitar quantidade, ou Cancelar!');
        }
    }

    /** Efetua o encerramento da ordem de separação */
    private encerrar() {
        let resp: any;
        this.createLoading('Encerrando O.S. ' + this.ordSep)
        this.loader.present();

        this.servico.postEncerrarOrdemSeparacao(this.ordSep).subscribe(
            data => {
                resp = data;
                this.loader.dismiss();
                switch (resp.status) {
                    case 'OK':
                        this.viewCtrl.dismiss()
                        break;

                    case 'ERRO':
                        // let erroTexto = resp.erro.join('<br>')
                        this.showAlertMessage('Algo errado!', resp.erro);
                        break;
                }
            },
            erro => {
                //console.log('LeituraConfrencia encerrar ERRO:', erro);
                this.loader.dismiss();
                if (erro.error.errorMessage) {
                    this.showAlertMessage('ERRO', erro.error.errorMessage);
                } else {
                    this.showAlertMessage('ERRO', erro.statusText);
                }
            }
        )
    }

    /** Exibe alerta de confirmação ou erro */
    public showAlertMessage(titulo: string, mensagem: string, botoes?: Array<AlertButton>) {
        const arrDefaultButton = [
            {
                text: 'Corrigir',
                role: 'cancel'
            }
        ];

        let alert = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
            buttons: botoes || arrDefaultButton
        });

        alert.present();
    }


    /** Exibe um ActionSheet de opções de esolha ao usuário */
    presentActionSheet(titulo: string, botoes: Array<ActionSheetButton>) {
        const actionSheet = this.actionSheetCtrl.create({
            title: titulo, 
            buttons: botoes
        });
        actionSheet.present();
    }

}
