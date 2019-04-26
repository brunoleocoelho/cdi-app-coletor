/**
 * @name Contagem
 * @description Classe que modela uma contagem
 */
export class Contagem {

    CCUSTO: String;
    CCDESC: String;
    CONT: String;
    EQUIPE: Array<String>;
    ITENS: Array<ItemContado>;
    LOCAL: String;
    STATUS: String; //0-Bloqueado, 1-Liberado, 2-Em processo, 3-Suspenso, 9-Encerrado
    TPCONT: String; //1-Por Produto, 2-Por OP, 3-ZAMAC

    constructor() {
        this.ITENS = [];
        this.EQUIPE = [];
    }
}

/**
 * @name Produto
 * @description Classe que modela um produto
 */
export class Produto{
    CODIGO: String;
    DESCRICAO: String;
    ATIVO: String;
    NUMOP: String;
    STATUSOP: String;
    UM: String;
}

/**
 * @name ItemContado
 * @description Representa um item contado que será enviado p/ inventario
 */
export class ItemContado {
    CCUSTO: string;
    CONTAGEM: string;
    LOCAL: string;
    PRODUTO: string;
    OP: string;
    DESCRICAO: string;
    QUANT: number;
}