import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LeituraConferenciaPage } from '../leitura-conferencia/leitura-conferencia';
import { ServiceStorageProvider } from '../../providers/service-storage/service-storage';
import { UserHendHeld } from '../../models/UserHendHeld';
import { LoginPage } from '../login/login';

/**
 * Tela que exibe o menu inicial com todas as funções do app.
 *
*/
@IonicPage()
@Component({
  selector: 'page-home-menu',
  templateUrl: 'home-menu.html',
})
export class HomeMenuPage {
  private menu: any[];
  private usuario: UserHendHeld;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: ServiceStorageProvider,
    private alertCtrl: AlertController
  ) {
    this.menu = menus;
    this.usuario = storage.getUserLocal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeMenuPage');
  }

  /** Redireciona para a page correta */
  public openPage(page) {
    // console.log("MenuPage.openPage:", page); //linha teste
    this.navCtrl.push(page);
  }

  /** Efetua o logoff do app */ //Chamado no HTML
  public logOut() {
    let alert = this.alertCtrl.create({
      title: 'SAIR?',
      message: `Será feito logoff do usuário:<br><b> ${this.usuario.nome} </b>`,
      buttons: [
        { 
          text: 'Cancelar',
          handler: () => console.log('Cancelou SAIR!')
        },
        { 
          text: 'LOGOFF',
          handler: () => {
            this.storage.removeLocalData();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

}


/** Itens a serem exibidos na tela de menu principal */
const menus = [
  {
    titulo: 'Ordens de Separação',
    componentes: [
      {
        titulo: 'Conferência',
        page: LeituraConferenciaPage,
        icone: 'checkbox-outline'
      },
      // { titulo: 'Pedidos de Venda', page: PedidosVendaPage, icone: 'open' },
      // { titulo: 'Produtos', page: ProdutosPage, icone: 'pricetags' },
    ]
  },
  // {
  //   titulo: 'Incluir',
  //   componentes: [
  //     { titulo: 'Cliente', page: ClienteNovoPage, icone: 'podium' }
  //   ]
  // }
];