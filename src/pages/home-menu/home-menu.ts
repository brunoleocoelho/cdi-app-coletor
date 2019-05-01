import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LeituraConferenciaPage } from '../conferencia-acao/leitura-conferencia/leitura-conferencia';
import { ServiceStorageProvider } from '../../providers/service-storage/service-storage';
import { UserHandHeld } from '../../models/UserHandHeld';
import { LoginPage } from '../login/login';
import { ConferenciaAcaoPage } from '../conferencia-acao/conferencia-acao';

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
  private usuario: UserHandHeld = new UserHandHeld();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: ServiceStorageProvider,
    private alertCtrl: AlertController
  ) {
    this.menu = menus;
    this.storage.getUserLocal()
      .then(data => this.usuario = data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeMenuPage');
  }

  /** Redireciona para a page correta */
  public openPage(page) {
    // console.log("MenuPage.openPage:", page); //linha teste
    if (page !== null) this.navCtrl.setRoot(page);
  }

  /** Efetua o logoff do app */ //Chamado no HTML
  public logOut() {
    let alert = this.alertCtrl.create({
      title: 'DESEJA SAIR?',
      message: `Será desconectado o usuário:<br><b> ${this.usuario.nome} </b>`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => console.log('Cancelou SAIR!')
        },
        {
          text: 'LOGOFF',
          handler: () => {
            this.storage.removeLocalData()
              .then(() => this.navCtrl.setRoot(LoginPage))
              .catch(err => console.log('Local Data NOT REMOVED', err));
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Método para exibir/ocultar os itens da categoria de menu
   * @param idx índice a ser exibido
   */
  public toggleCategory(idx) {
    this.menu.forEach(
      (element, index) => {
        element.open = index != idx ? false : true
      }
    );
    this.menu[idx].open = !this.menu[idx].open;
  }

}


/** 
 * Itens a serem exibidos na tela de menu principal 
 * * Ex: {
 *   grupo: 'Incluir',
 *   componentes: [
 *     { titulo: 'Cliente', page: ClienteNovoPage, icone: 'podium' }
 *   ]
 * }
*/
const menus = [
  {
    grupo: 'Expedição',
    componentes: [
      {
        titulo: 'Separação',
        page: null,
        icone: 'add'
      },
      {
        titulo: 'Ordena Almox.',
        page: null,
        icone: 'list'
      },
      {
        titulo: 'Conferência',
        page: ConferenciaAcaoPage,
        icone: 'checkbox-outline'
      },
      {
        titulo: 'Transferência',
        page: null,
        icone: 'redo'
      },
    ]
  },
  {
    grupo: 'Recebimento',
    componentes: [
      {
        titulo: 'Conferência',
        page: null,
        icone: 'md-checkmark-circle-outline'
      },
      {
        titulo: 'Estocagem',
        page: null,
        icone: 'logo-buffer'
      },
      {
        titulo: 'Etiquetagem',
        page: null,
        icone: 'pricetag'
      },
    ]
  },
  {
    grupo: 'Consultas',
    componentes: [
      {
        titulo: 'Info. Produto',
        page: null,
        icone: 'ios-search-outline'
      },
      {
        titulo: 'Etiquetas',
        page: null,
        icone: 'pricetag'
      },
    ]
  },
];