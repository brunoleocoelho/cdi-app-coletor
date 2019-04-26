import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { ServiceApiProvider } from '../../providers/service-api/service-api';
import { UserHandHeld } from '../../models/UserHandHeld';
import { HomeMenuPage } from '../home-menu/home-menu';
import { ServiceStorageProvider } from '../../providers/service-storage/service-storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    usuario: UserHandHeld;
    private title: string;
    private loader: Loading;
    private user: string;
    private pwd: string;
    private yearCurrent: Date;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private servico: ServiceApiProvider,
        private storage: ServiceStorageProvider
    ) {
        console.log('LoginPage');
        this.title = 'Coleta de Dados'
        this.user = '';
        this.pwd = '';
        this.yearCurrent = new Date();
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad LoginPage');
        // this.loginLocal();
    }

    /** Exibe um elemento loading */
    private createLoading(content) {
        this.loader = this.loadingCtrl.create({
            spinner: 'dots',
            content: content + '...'//'<ion-spinner name="dots">Fazendo Login...</ion-spinner>'
            // duration: 1000
        });
    }

    /** Efetua o Login do usuário */
    private doLogIn() {
        let errors = [];

        this.createLoading('Fazendo Login'); //exibindo imagem de loading

        //enviando dados de login
        if (this.user.length === 0)
            errors.push('<b>Usuário</b> deve ser preenchido.')

        if (this.pwd.length === 0)
            errors.push('<b>Senha</b> deve ser informada.')


        if (errors.length > 0) {
            this.showAlert('Entradas Inválidas!', errors);
        }
        else {
            this.storage.saveCredentials(this.user, this.pwd)

            this.usuario = userFake;
            this.usuario.usrName = this.user;
            this.storage.saveUserLocal(this.usuario).then(
                () => this.navCtrl.setRoot(HomeMenuPage)
            )
            .catch( err => console.log('LoginPage.saveUserLocal.err', err) )

            // this.loader.present();

            // let dados: any;
            // this.servico.logUserIn(this.user, this.pwd)
            //     .subscribe(
            //         data => {
            //             dados = data;
            //             console.log("LoginPage:doLogin:data: ", data); //linha teste
            //             this.checkLogin(dados);
            //         },
            //         err => {
            //             console.log("LoginPage:doLogin:err: ", err); //linha teste
            //             let texto: string;
            //             let titulo: string;
            //             if (err.error.errorCode) {
            //                 titulo = 'Erro!';
            //                 texto = '<b>Login Erro: </b>' + err.error.errorCode + '<br>' + '<b>Mensagem: </b>' + err.error.errorMessage;
            //             }
            //             else {
            //                 titulo = err.name;
            //                 texto = '<b>Mensagem: </b>' + err.message;
            //             }
            //             this.loader.dismiss()
            //             this.showAlert(titulo, texto);
            //             //this.showAlert('Erro de rede!', 'Não foi possível verificar Integrante e Senha.');
            //             //removendo exibição do loading
            //         },
            //         () => {
            //             this.loader.dismiss();
            //         }
            //     );
        }
    }

    /** Verifica se os dados retornados são válidos para login */
    private checkLogin(dados) {
        if (dados.status == 'OK') {

            if (dados.usuario && dados.usuario != null) {
                this.usuario = <UserHandHeld> dados.usuario;

                this.storage.saveUserLocal(this.usuario);

            }
            else {
                this.showAlert('Usuário Protheus', 'Usuário Protheus inexistente!');
            }
        }
        else {
            this.showAlert('Erro', dados.error.errorMessage + ' Verifique!');
        }
    }


    /** Exibe alerta de confirmação ou erro */
    private showAlert(titulo: string, mensagem: string | Array<string>) {
        // concatenação da mensagem passada
        const texto = typeof (mensagem) === 'string' ? mensagem : mensagem.reduce(
            (result, item) => result += item + '<br>', /*initialValue:*/ ''
        )

        let alert = this.alertCtrl.create({
            title: titulo,
            message: texto,
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
}


/** User Fake para testes */
const userFake = <UserHandHeld> {
    bloqueio: false,
    cargo: 'Conferidor',
    depto: 'Expedição',
    email: 'email@teste.com.br',
    diasExpira: 0,
    id: '102030',
    nivelAcesso: 1,
    dtVald: new Date('2019-06-15'),
    nome: 'Bruno Coelho',
    usrName: ''
}