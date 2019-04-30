/** 
 * Conjunto de Constantes para uso no App.
 * Repositorio de Projeto: https://gitlab.com/brunoleocoelho/cdi-app-coletor
 */
export const Res = {
    
    /** Strings comuns usadas no app */
    Strings: {
        confirmar:"Confirmar",
        cancelar:"Cancelar",
        settings:"Configurações"
    },

    Status: [
        "Bloqueado", "Liberado", "Em processo", "Suspenso", "Encerrado"
    ],
    
    /** Strings das URLs usadas na aplicação*/
    Urls:{
        /** URL com IP, porta e destino da conexão com o serviço REST */
        // HOST: "http://192.168.1.13:8085/restT1", //CDI AppServer REST Validação 
        HOST: "http://192.168.1.13:8086/restT1",    //CDI AppServer REST PRODUÇÃO

        //USUARIO
        /** Para login de usuario do coletos, passando usuario protheus na URL.
         * Retorna dados do usuário
         * - Ex.: LOGIN_USUARIO + {usuario} 
         */
        LOGIN_USUARIO: "/LoginUser/",

        /** Para abrir a conferência de uma Ordem de Separação
         * Numero da O.S. deve ser passado no final da URL.
         * * Ex: HTTP POST /OrdemSeparacao/abreconf/102030
         */
        ORDSEP_POST_ABRECONF: "/OrdemSeparacao/abreconf/",

        /** Para buscar informação do produto, conforme código passado no fim da URL.
         * * Ex: HTTP GET /OrdemSeparacao/produto/100-200-300
         */
        ORDSEP_GET_PRODUTO: "/OrdemSeparacao/produto/",

        /** Para postar item conferido. 
         * Numero da O.S. deve ser passada no fim da URL, e produto no Body Http.
         * * Ex: HTTP POST /OrdemSeparacao/encerra/102030
         * *    HTTP BODY { produto: produto }
         */
        ORDSEP_POST_CONFERENCIA: "/OrdemSeparacao/conferencia/",
        
        /** Para encerramento da conferencia.
         * Código da O.S. deve ser passado no fim da URL.
         * * Ex: HTTP POST /OrdemSeparacao/encerra/102030
         */
        ORDSEP_POST_ENCERRA: "/OrdemSeparacao/encerra/",


    }
}

  
  

