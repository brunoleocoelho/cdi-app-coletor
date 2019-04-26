/** 
 * Conjunto de Constantes para uso no App 
 * Repositoriio de Projeto: https://gitlab.com/brunoleocoelho/app-inventario-3f
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

        //PRODUTOS
        /** Retorna informações de produto de SB1 pelo centro custo (cc) e codigo produto (codProd) recebido na URL
         * - Ex.: PRODUTO_SB1 + cc=16101&codProd=PI821E01ZAT 
         */
        PRODUTO_SB1: "/Produtos?tabela=SB1&", 
        
        /** Retorna informações de produto de SC2 pelo centro custo (cc) e op (op) recebida na URL
         * - Ex.: PRODUTO_SC2 + cc=16101&op=465084
         */
        PRODUTO_SC2: "/Produtos?tabela=SC2&",   
    
        //CONTAGEM
        /** Retorna uma lista de Contagens referentes as equipes da pertencente Matricula recebida via URL
         * - Ex.: CONTAGEM_GET_LISTA + Matricula 
         */
        CONTAGEM_GET_LISTA: '/Contagem/Lista/', 
        
        /** Inclui item contado conforme conforme C.Custo, Local, Num.Contagem recebidos na URL
         * - Ex.: CONTAGEM_POST_INCLUI + cCusto/Local/NumCont. 
         */
        CONTAGEM_POST_INCLUI: '/Contagem/Inclui/',

        /** Altera STATUS de uma contagem conforme C.Custo, Local, Num.Contagem recebidos na URL
         * - Ex.: CONTAGEM_PUT_ALTERA + cCusto/Local/NumCont 
         */
        CONTAGEM_PUT_ALTERA: '/Contagem/Altera/', 

        /** Suspende uma contagem (Status=3) conforme C.Custo, Local, Num.Contagem recebidos na URL
         * - Ex.: CONTAGEM_PUT_SUSPENDE + cCusto/Local/NumCont 
         */
        CONTAGEM_PUT_SUSPENDE: '/Contagem/Suspende/', 

    }
}

  
  

