import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Classes
import { Produto } from '../../models/Produto';
import { UserHandHeld } from '../../models/UserHandHeld';
//Services
import { Res } from '../../app/app.constants';
import { ServiceStorageProvider } from '../service-storage/service-storage';

/** 
 * Serviço para interação com a API REST do protheus
 */
@Injectable()
export class ServiceApiProvider {
    private urlHost: string;
    private authHeader: HttpHeaders;

    constructor(
        public http: HttpClient,
        private storage: ServiceStorageProvider
    ) {
        console.log('Hello ServiceApiProvider Provider');
        this.urlHost = Res.Urls.HOST;
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
        let url = this.urlHost + Res.Urls.LOGIN_USUARIO + usuario;
        let auth = btoa(`${usuario}:${senha}`)
        let headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);
        return this.http.get( url, { headers } );
    }

    /** Retorna informações do produto passado no parametro */
    public getProdutoInfo(prodCod: string) {
        let url = this.urlHost + Res.Urls.ORDSEP_GET_PRODUTO + prodCod;
        return this.http.get( url, { headers: this.authHeader })
    }

    /** Busca a Ordem de Separação, abrindo a conferencia */
    public postConfereOrdemSeparacao(codigo: string) {
        let url = this.urlHost + Res.Urls.ORDSEP_POST_ABRECONF + codigo
        return this.http.post( url,{}, { headers: this.authHeader } );        
    }

    /** Posta um item de conferencia para a ordem de separacao */
    public postItemConferencia(ordem: string, produto: Produto) {
        let data = {produto: produto}
        let url = this.urlHost + Res.Urls.ORDSEP_POST_CONFERENCIA + ordem
        return this.http.post( url, { data }, {headers: this.authHeader} )
    }

    /** Encerra a ordem de separação passada por parametro */
    public postEncerrarOrdemSeparacao(ordem: string){
        let url = this.urlHost + Res.Urls.ORDSEP_POST_ENCERRA + ordem;
        return this.http.post( url, { ordem: ordem }, {headers: this.authHeader})
    }
}
