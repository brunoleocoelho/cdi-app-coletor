import { Injectable } from "@angular/core";
import { Res } from '../../app/app.constants';
import { UserHandHeld } from "../../models/UserHandHeld";
import { Storage } from "@ionic/storage";

/**
 * Serviço para armazenamento de dados localmente no device
 */
@Injectable()
export class ServiceStorageProvider {

    constructor(private storage: Storage ) {
    }

    /** Armazena o usuario localmente no app, */
    public saveUserLocal(usr: UserHandHeld) {
        return this.storage.set('usuario', JSON.stringify(usr))
    }

    /** Armazena o credentials localmente no app pronto para Basic Auth */
    public saveCredentials(usr, pwd) {
        let credentials = btoa(`${usr}:${pwd}`)
        return this.storage.set('credentials', credentials)
    }

    /** Retorna as as informações do usuário logado armazenadas no app */
    public getUserLocal(){
        return this.storage.get('usuario')
            .then( value => <UserHandHeld> JSON.parse(value) )
            .catch( err => err )   
    }

    /** Retorna as credentials do usuário logado pronto para Basic Auth */
    public getCredentials(){
        return this.storage.get('credentials')
    }

    /** Remove os dados armazenados localmente */
    public removeLocalData(){
        return this.storage.clear();
    }
    

}