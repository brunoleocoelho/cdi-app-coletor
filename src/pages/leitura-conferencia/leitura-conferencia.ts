import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, TextInput, Loading, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
// import { Produto } from '../../models/Contagem';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { Keyboard } from "@ionic-native/keyboard";
import { ItemContado, Contagem, Produto } from '../../models/Contagem';
import { ThrowStmt } from '@angular/compiler';
/**
 * Generated class for the LeituraConferenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()

@Component({
    selector: 'page-leitura-conferencia',
    templateUrl: 'leitura-conferencia.html',
})
export class LeituraConferenciaPage {
    @ViewChild('inputQtd') inputQtd: TextInput; //input do HTML referenciado no TypeScript

    private contagem: Contagem;
    private produto: { CODIGO: String, DESCRICAO: String, QUANT: number, UM: String, OP: string };;
    private item: ItemContado;
    private loader: Loading;
    private achouItem: boolean;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private servico: ServiceApiProvider,
        private barcodeScanner: BarcodeScanner,
        private keyboard: Keyboard,
        private loadingCtrl: LoadingController
    ) {
        this.produto = { CODIGO:'', DESCRICAO: '', QUANT: null, UM: '', OP: '' };
        this.item = <ItemContado> this.navParams.get('item');
        this.contagem = <Contagem> this.navParams.get('contagem')
        // console.log('LeituraProduto contagem:', this.contagem);//linha teste
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad LeituraConferenciaPage');
        // console.log("PRODUTOS", this.produtos);
        // this.keyboard.hide();
        this.lerCodigoBarras();
    }

    /** CHAMA O LEITOR DE CODIGO DE BARRAS P/ LEITURA */
    private lerCodigoBarras() {
        this.barcodeScanner.scan({
            orientation: 'portrait',                            //orientação de tela: landscape ou portrait
            showTorchButton: true,                              //botão de luz
            prompt: 'Posicione o leitor no codigo de barras',   //texto exibido na leitura de código de barras
            resultDisplayDuration: 1000                         //tempo exibição leitura
        })
        .then(barcodeData => {
            // console.log('lerCodigoBarras data', barcodeData);
            let codigo = barcodeData.text.trim();
            if (codigo && codigo.length > 0) {
                if (this.item) {
                    switch (this.contagem.TPCONT) {
                        case '1':
                            if (this.item.PRODUTO == codigo) {
                                this.checkItemContado(codigo);
                            } 
                            else {
                                this.showAlertMessage('Código diferente','Código lido difere do item a ser recontado!');
                            }
                            break;
                    
                        case '2':
                        case '3':
                            if (this.item.OP == codigo) {
                                this.checkItemContado(codigo);
                            } 
                            else {
                                this.showAlertMessage('Código diferente','Código lido difere da OP a ser recontada!');
                            }
                            break;
                    }
                } 
                else {
                    this.checkItemContado(codigo);
                }
            }
        }).catch(err => {
            console.log('lerCodigoBarras err', err);
        });
    }

    /** Chama o serviço que verifica se produto está condizente com dados da contagem */
    private checkItemContado(item){
        let dados: any;
        this.createLodaing('Verificando item');
        this.loader.present();
        // this.servico.getItemContado(this.contagem, item).subscribe(
        //     data => {
        //         this.loader.dismiss();
        //         this.achouItem = true;
        //         dados = data;
        //         console.log('LeituraProduto CheckItemContado OK:', data); //linha teste
        //         // this.showAlertMessage('GetItemContado', JSON.stringify(dados)); //linh teste
        //         this.produto.DESCRICAO = dados.Produto.DESCRICAO;
        //         this.produto.UM = dados.Produto.UM;
        //         switch (this.contagem.TPCONT){
        //             case '1':
        //                 this.produto.CODIGO = item; //produto
        //                 break;

        //             case '2':
        //                 this.produto.OP = item; //OP
        //                 break;

        //             case '3':
        //                 this.produto.OP = item; //OP
        //                 this.produto.CODIGO = 'MP0084'; //codigo produto ZAMAC
        //                 this.produto.DESCRICAO = 'MP0084 - ZAMAC';
        //                 this.produto.UM = 'KG';
        //                 break;
        //         }
        //         window.setTimeout(
        //             ()=>{ this.inputQtd._jsSetFocus(); },
        //             1000
        //         )
        //     },
        //     erro => {
        //         console.log('LeituraProduto CheckItemContado ERRO:', erro);
        //         if (erro.error.errorMessage) {
        //             this.showAlertMessage('ERRO', erro.error.errorMessage );                    
        //         } else {
        //             this.showAlertMessage('ERRO', erro.statusText );
        //         }
        //         this.achouItem = false;
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

    /** SAI DA CONTAGEM DO PRODUTO */
    public voltar() {
        console.log('LeituraProduto voltar clicado!');
        this.viewCtrl.dismiss();
    }

    /** Confirma o produto contado */
    public confirmar() {
        let contou: boolean = false;

        switch (this.contagem.TPCONT) {
            case '1':
                contou = (this.produto.CODIGO != '' && this.produto.QUANT != null) ? true : false ;
                break;

            default:
                contou = (this.produto.OP != '' && this.produto.QUANT != null) ? true : false ;
                break;
        }

        if (contou) {
            console.log('LeituraProduto confirmar', this.produto);
            this.viewCtrl.dismiss(this.produto);
        }
        else {
            this.showAlertMessage('Ops!', 'Você não contou nenhum item!<br>Leia o Código de Barras ou Cancele!');
        }
    }

    /** Exibe alerta de confirmação ou erro */
    public showAlertMessage(titulo: string, mensagem: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            message: mensagem,
            buttons: [
                {
                    text: 'Corrigir',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    }

}
