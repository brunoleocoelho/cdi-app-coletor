/**
 * @name Produto
 * @description Classe que modela um produto
 */
export class Produto{
    CODIGO: String
    DESCRICAO: String
    QUANT: number
    UM: String

    constructor(){
        this.CODIGO =''
        this.DESCRICAO = ''
        this.QUANT = null
        this.UM = ''
    }
}
