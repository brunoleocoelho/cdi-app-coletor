import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Loading, LoadingController } from 'ionic-angular';
import { Contagem, Produto, ItemContado } from '../../models/Contagem';
import { LeituraConferenciaPage } from '../leitura-conferencia/leitura-conferencia';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { ContagemListaPage } from '../contagem-lista/contagem-lista';

/**
 * Generated class for the ContagemAcaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-contagem-acao',
    templateUrl: 'contagem-acao.html',
})
export class ContagemAcaoPage {
    private produtos: Array<Produto> = new Array<Produto>();            //Todos os produtos
    public contagem: Contagem;                         //Objeto p/ abrir contagem
    private loader: Loading;
    private verLista: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private servico: ServiceApiProvider,
        private alertCtrl: AlertController,
        public modalCtrl: ModalController,
        private loadingCtrl: LoadingController

    ) {
        console.log("ContagemAcaoPage");
        this.contagem = new Contagem();
        this.contagem = <Contagem>this.navParams.get('contagem');//Objeto p/ abrir contagem
        console.log("ContagemAcao contagem", this.contagem);//linha teste

        if (this.contagem.CONT=='3' || this.contagem.CONT=='4') {
            this.verLista = false;
        }
        else{
            this.verLista = true;
        }
    }

    // ionViewDidLoad() {
    //     // console.log('ionViewDidLoad ContagemAcaoPage');
    //     //Abre leitor se contagem iniciou
    //     window.setTimeout(
    //         ()=>{
    //             if (this.contagem.ITENS.length == 0) {
    //                 this.exibirModalLeitura();
    //             }
    //         },
    //         750
    //     )
    // }

    // /** MOSTRA UM MODAL P/ CONTAGEM C/ LEITURA DE CODIGO DE BARRAS */
    // private exibirModalLeitura() {
    //     let profileModal = this.modalCtrl.create( 
    //         LeituraConferenciaPage, 
    //         { contagem: this.contagem } 
    //     );

    //     // dados recebidos ao voltar do modal de leitura do produto
    //     // Estrutura retornada produto { CODIGO: String, DESCRICAO: String, QUANT: number, UM: String, OP: string }
    //     profileModal.onDidDismiss(
    //         data => {
    //             console.log("profileModal.onDidDismiss data", data);
    //             //this.showAlertMessaage('Dados', JSON.stringify(data));//linha teste
                
    //             if (data) {
    //                 let item = <ItemContado>{
    //                     CCUSTO: this.contagem.CCUSTO,
    //                     LOCAL: this.contagem.LOCAL,
    //                     CONTAGEM: this.contagem.CONT,
    //                     PRODUTO: data.CODIGO ,
    //                     OP: data.OP,
    //                     DESCRICAO: data.DESCRICAO,
    //                     QUANT: Number.parseFloat(data.QUANT),
    //                 }
    //                 this.postarItem(item);
    //             }
    //         }
    //     );

    //     profileModal.present();
    // }


    // /** EXIBE UM MODAL P/ RECONTAGEM DE UM ITEM (QUANDO ) */
    // private exibirModalRecontagem(item: ItemContado){
    //     if ((this.contagem.CONT=='3' || this.contagem.CONT=='4') && item.QUANT == 0) {
    //         let profileModal = this.modalCtrl.create( 
    //             LeituraConferenciaPage, 
    //             { 
    //                 contagem: this.contagem,
    //                 item: item
    //             } 
    //         );
    //         // dados recebidos ao voltar do modal de leitura do produto
    //         // Estrutura retornada produto { CODIGO: String, DESCRICAO: String, QUANT: number, UM: String, OP: string }
    //         profileModal.onDidDismiss(
    //             data => {
    //                 console.log("profileModal.onDidDismiss data", data);
    //                 //this.showAlertMessaage('Dados', JSON.stringify(data));//linha teste
                    
    //                 if (data) {
    //                     let itemContado = <ItemContado>{
    //                         CCUSTO: this.contagem.CCUSTO,
    //                         LOCAL: this.contagem.LOCAL,
    //                         CONTAGEM: this.contagem.CONT,
    //                         PRODUTO: data.CODIGO ,
    //                         OP: data.OP,
    //                         DESCRICAO: data.DESCRICAO,
    //                         QUANT: Number.parseFloat(data.QUANT),
    //                     }
    //                     this.postarItem(itemContado);
    //                 }
    //             }
    //         );
    
    //         profileModal.present();
    //     }
    // }

    // /** Exibe um elemento loading */
    // private createLodaing(mensagem: string) {
    //     this.loader = this.loadingCtrl.create({
    //         spinner: 'dots',
    //         content: mensagem + '...'//'<ion-spinner name="dots">Fazendo Login...</ion-spinner>'
    //         // duration: 1000
    //     });
    // }

    // /** ABRE TELA DE LEITURA DE PRODUTO */
    // private lerProduto() {
    //     this.navCtrl.push(
    //         LeituraConferenciaPage,
    //         { contagem: this.contagem }
    //     );
    // }

    // /** Exibe mensagem de saída da contagem */
    // private sairContagem(acao:string) {
    //     let mensagem: string;
    //     switch (acao) {
    //         case 'Encerrar':
    //             mensagem = 'A contagem <b>Em Processo</b> será <b>ENCERRADA</b>'
    //         break;
        
    //         case 'Suspender':
    //             mensagem = 'A contagem <b>Em Processo</b> será <b>SUSPENSA</b>'            
    //         break;
    //     }

    //     if (this.contagem.ITENS.length > 0) {
    //         const confirm = this.alertCtrl.create({
    //             title: acao + ' Contagem?',
    //             message: mensagem,
    //             buttons: [
    //                 { //Cancela
    //                     text: 'Cancelar',
    //                     handler: () => { console.log('Cancelou '+ acao +' contagem!'); }
    //                 },
    //                 { //Grava e sai
    //                     text: acao,
    //                     handler: () => {
    //                         this.createLodaing('Alterando Status');
    //                         this.loader.present();
    //                         if (acao == 'Encerrar') {
    //                             this.servico.changeStatusContagem(this.contagem).subscribe(
    //                                 data => {
    //                                     console.log(acao +' contagem OK', data);
    //                                     this.navCtrl.setRoot(ContagemListaPage);
    //                                 },
    //                                 erro =>{
    //                                     console.log(acao + ' contagem ERRO', erro);                                    
    //                                     this.loader.dismiss();
    //                                     this.showAlertMessaage('Erro', 'Não foi possível '+ acao +' a contagem!');
    //                                 },
    //                                 ()=>{
    //                                     this.loader.dismiss();
    //                                 }
    //                             );
    //                         }
    //                         if(acao == 'Suspender') {
    //                             this.servico.suspendeContagem(this.contagem).subscribe(
    //                                 data => {
    //                                     console.log(acao +' contagem OK', data);
    //                                     this.navCtrl.setRoot(ContagemListaPage);
    //                                 },
    //                                 erro =>{
    //                                     console.log(acao +' contagem ERRO', erro);                                    
    //                                     this.loader.dismiss();
    //                                     this.showAlertMessaage('Erro', 'Não foi possível '+ acao +' a contagem!');
    //                                 },
    //                                 ()=>{
    //                                     this.loader.dismiss();
    //                                 }
    //                             );
    //                         }
    //                     }
    //                 }
    //             ]
    //         });
    //         confirm.present();
    //     }
    //     else {
    //         let titulo: string;
    //         if (this.contagem.CONT == '1' || this.contagem.CONT == '2') {
    //             titulo = 'Contagem SEM itens!';
    //             mensagem = 'Nenhum item foi contado no momento!<br><b>SUSPENDER contagem?</b>';
    //         } else {
    //             titulo = acao + ' contagem?';
    //             mensagem = 'Contagem será SUSPENSA!';
    //         }
    //         const confirm = this.alertCtrl.create({
    //             title: titulo,
    //             message: mensagem,
    //             buttons: [
    //                 { //Cancela
    //                     text: 'Cancelar',
    //                     handler: () => { console.log('Cancelou sair da contagem!'); }
    //                 },
    //                 { //Abre
    //                     text: 'SUSPENDER',
    //                     handler: () => {
    //                         this.createLodaing('Suspendendo Contagem');
    //                         this.loader.present();
    //                         this.servico.suspendeContagem(this.contagem).subscribe(
    //                             data => {
    //                                 console.log('SUSPENDER contagem (SEM ITENS) OK', data);
    //                                 this.navCtrl.setRoot(ContagemListaPage);
    //                             },
    //                             erro =>{
    //                                 console.log('SUSPENDER contagem (SEM ITENS) ERRO', erro);                                    
    //                                 this.showAlertMessaage('Erro', 'Não foi possível SUSPENDER a contagem!');
    //                             },
    //                             ()=>{ this.loader.dismiss(); }
    //                         );
    //                     }
    //                 }
    //             ]
    //         });
    //         confirm.present();
    //     }
    // }

    // /** Exibe alerta de confirmação ou erro */
    // private showAlertMessaage(titulo: string, mensagem: string) {
    //     let alert = this.alertCtrl.create({
    //         title: titulo,
    //         message: mensagem,
    //         buttons: [
    //             {
    //                 text: 'OK',
    //                 role: 'close',
    //                 handler: () => { }
    //             }
    //         ]
    //     });
    //     alert.present();
    //     //Definindo timeout para mensagem OK
    //     if (titulo == 'OK') {
    //         window.setTimeout(
    //             ()=>{ alert.dismiss(); },
    //             500
    //         )
    //     }
    // }

    // /** Chama o serviço de inclusão de um item contado na base */
    // private postarItem(product: ItemContado){
    //     this.createLodaing('Postando item');
    //     this.loader.present();
    //     let res: any;
    //     this.servico.postProdutoContado(this.contagem, product).subscribe(
    //         data => {
    //             res = data;
    //             this.loader.dismiss();
    //             this.fillUpContagemArray(product);
    //             this.showAlertMessaage('OK', res.Mensagem);
    //         },
    //         erro => {
    //             this.loader.dismiss();
    //             if (erro.error.errorMessage) {
    //                 this.showAlertMessaage('Erro', erro.error.errorMessage);
    //             }
    //             else {
    //                 this.showAlertMessaage('Erro', erro.statusText);
    //             }
    //         }
    //     )
    // }

    // /** Para popular o array de itens contados */
    // private fillUpContagemArray(product: ItemContado){
    //     if (this.contagem.CONT == '3' || this.contagem.CONT == '4') {
    //         let idx = this.contagem.ITENS.findIndex( x => x.OP == product.OP && x.PRODUTO == product.PRODUTO );
    //         this.contagem.ITENS[idx] = product;
    //     } 
    //     else {
    //         this.contagem.ITENS.push(product);
    //     }
    // }

    // /** Exibe a lista de itens para recontagem */
    // private seeList(){
    //     this.verLista = !this.verLista;
    // }
}
