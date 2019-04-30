import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from '../../app/app.constants';
import { UserHandHeld } from '../../models/UserHandHeld';
import { ServiceStorageProvider } from '../service-storage/service-storage';
import { Produto } from '../../models/Produto';

/*
  Generated class for the ServiceApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceApiProvider {
    private url: string;
    private authHeader: HttpHeaders;

    constructor(
        public http: HttpClient,
        private storage: ServiceStorageProvider
    ) {
        console.log('Hello ServiceApiProvider Provider');
        this.url = Res.Urls.HOST;
        this.setAuthHeader();
    }
    
    /** Define a variavel de controle de autenticação para o REST Protheus */
    setAuthHeader(){
        this.storage.getCredentials().then( 
            data => {
                const auth = data;
                this.authHeader = new HttpHeaders().set('Authorization', 'Basic ' + data);
            }
        )
    }

    /** Fazendo o login de usuário PROTHEUS com HTTP GET */
    public logUserIn(usuario, senha) {
        let url = this.url + Res.Urls.LOGIN_USUARIO + usuario;
        let auth = btoa(`${usuario}:${senha}`)
        let headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);
        return this.http.get( url, { headers } );
    }

    /** Retorna informações do produto passado no parametro */
    public getProdutoInfo(prodCod: string) {
        let url = this.url +'OrdemSeparacao/produto/'+ prodCod;
        return this.http.get( url, { headers: this.authHeader })
    }

    /** Busca a Ordem de Separação, abrindo a conferencia */
    public postConfereOrdemSeparacao(codigo: string) {
        let url = this.url +'/OrdemSeparacao/abre/'+ codigo
        return this.http.post( url,{}, { headers: this.authHeader } );        
    }

    /** Posta um item de conferencia para a ordem de separacao */
    public postItemConferencia(ordem: string, produto: Produto) {
        let data = { ordem: ordem, produto: produto }
        let url = this.url +'/OrdemSeparacao/conferencia/'+ ordem
        return this.http.post( url, { data }, {headers: this.authHeader} )
    }

    /** Encerra a ordem de separação passada por parametro */
    public postEncerrarOrdemSeparacao(ordem: string){
        let url = this.url +'OrdemSeparacao/encerra/'+ ordem;
        return this.http.post( url, { ordem: ordem }, {headers: this.authHeader})
    }
}
