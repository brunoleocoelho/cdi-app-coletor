## INFORMAÇÕES DO PROJETO

Desenvolvimento de um app Android para empresa CDI a fim de funcionar como coletor de dados,
utilizando leitura de código de barras, em substituição dos coletores de sistema ACD, que possuem muitas limitações.
A princípio foi determinado criar apenas um protótipo com a função de conferência de itens de
ordem de separação. 

Projeto armazenado no GitLab para controle de versão de código:
https://gitlab.com/brunoleocoelho/cdi-app-coletor


### Tecnologias envolvidas ###
- Ionic v3: https://ionicframework.com/docs/v3
    Framework para desenvolvimento de apps cross-platform desktop e mobile (Android, iOS e Windows Phone).
    Possui diversos componentes focados em UI para desenvolver apenas um código e app, e rodar em ambas plataformas.
    Utiliza como base o framework Angular (Google), e recursos de código com TypeScript ("JavaSscript tipado"), e 
    é compilado para rodar nativamente utilizando Cordova.

- Angular: https://angular.io/
    Framework de JavaScript desenvolvido e mantido pela Google, a fim de desenvolver aplicações multiplataforma e multiscreen.

- Node & npm: https://nodejs.org/
    https://www.npmjs.com/
    Node é um interpretador de Javascript destinado a rodar em back-end (server). 
    NPM é um gerenciador de pacotes para Node.
    Para atualizar todos pactoes, seguir as instruções: https://www.npmjs.com/package/npm-check-updates


### Run App ###
Abrir Android Studio, criar um virtual device e executá-lo.
Ou pelo terminal (ou prompt):
- Listar os virtual devices com: `emulator -list-avds` 
- Executar o device: `emulator -avd <nome do device>`

Pelo terminal na pasta do projeto exeuctar:
- Browser: ionic serve
- Emulador Android: `ionic cordova run android --livereload --emulator`
- Código pode ser debugado chamando developer tools no Chrome, depois em 'Remote Devices' clicar 'Inspect'


### Implementações ###
* 2019-ABR-26 - Início das implementações


