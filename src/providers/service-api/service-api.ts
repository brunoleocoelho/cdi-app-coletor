import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Res } from '../../app/app.constants';
import { UserHendHeld } from '../../models/UserHendHeld';
import { Contagem, ItemContado } from '../../models/Contagem';
import { ServiceStorageProvider } from '../service-storage/service-storage';

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
        this.authHeader = new HttpHeaders().set('Authorization', 'Basic ' + this.storage.getCredentials());
    }

    /** Fazendo o login de usuário PROTHEUS com HTTP GET */
    public logUserIn(usuario, senha) {
        this.url += Res.Urls.LOGIN_USUARIO + usuario;
        let auth = btoa(`${usuario}:${senha}`)
        let headers = new HttpHeaders().set('Authorization', 'Basic ' + auth);
        return this.http.get( this.url, { headers } );
    }

    /** Busca a Ordem de Separação */
    public getOrdemSeparação(codigo) {
        this.url += '/OrdemSeparacao/'+ codigo
        return this.http.get( this.url, { headers: this.authHeader } );        
    }
}
