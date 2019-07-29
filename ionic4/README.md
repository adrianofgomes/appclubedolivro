# App Clube do Livro - Front End Ionic 4

# Geração do APP

Setup inicial: Instalação do Node, Git e VSCode

Instalação do Ionic:
- Linha de comando: npm i -g ionic

Geração da estrutura básica do APP:
- Linha de comando: ionic start ionic4clubedolivro sidemenu

- Link de referência utilizado: https://ionicframework.com/docs/building/starting

# Execução do APP
- Linha de comando: ionic serve

# Criação da página de login
- Linha de comando: ionic g page login

- Adicionar a página de login no side menu:
Editar o arquivo app.component.ts:
  ...
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'person'
    },
  ...

- Link de referência utilizado: https://ionicframework.com/docs/building/scaffolding

# Adicionar o component ionic/storage para salvar dados locais no App
- Linha de comando: npm install @ionic/storage
- Link de referência utilizado: https://ionicframework.com/docs/building/storage

# Configurar PWA
Links de referência:
- https://developers.google.com/web/fundamentals/web-app-manifest/
- https://medium.com/@applification/progressive-web-app-splash-screens-80340b45d210
- https://ionicframework.com/docs/publishing/progressive-web-app
