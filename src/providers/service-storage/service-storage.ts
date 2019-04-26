import { Injectable } from "@angular/core";
import { Res } from '../../app/app.constants';
import { UserHendHeld } from "../../models/UserHendHeld";

@Injectable()
export class ServiceStorageProvider {

    constructor( ) {
    }

    /** Armazena o usuario localmente no app, */
    public saveUserLocal(usr: UserHendHeld) {
        window.localStorage.setItem('usuario', JSON.stringify(usr))
    }

    /** Armazena o credentials localmente no app pronto para Basic Auth */
    public saveCredentials(usr, pwd) {
        let credentials = btoa(`${usr}:${pwd}`)
        window.localStorage.setItem('credentials', credentials)
    }

    /** Retorna as as informações do usuário logado armazenadas no app */
    public getUserLocal(){
        return <UserHendHeld> JSON.parse(window.localStorage.getItem('usuario'))
    }

    /** Retorna as credentials do usuário logado pronto para Basic Auth */
    public getCredentials(){
        return window.localStorage.getItem('credentials')
    }

    /** Remove os dados armazenados localmente */
    public removeLocalData(){
        window.localStorage.clear();
    }
    

}