/**
 * @name UserHandHeld
 * @description
 * Classe que representa um usuario do app coletor de dados
 */
export class UserHandHeld {

    id: string
    usrName: string
    nome: string
    dtVald: Date
    diasExpira: number
    depto: string
    cargo: string
    email: string
    bloqueio: boolean
    nivelAcesso: number
    
    /** CONSTRUTOR  */
    constructor() {
        this.id = ''
        this.usrName = ''
        this.nome = ''
        // this.dtVald = new Date()
        this.diasExpira = 0
        this.depto = ''
        this.cargo = ''
        this.email = ''
        this.bloqueio = false
        this.nivelAcesso = 1
    }
}
