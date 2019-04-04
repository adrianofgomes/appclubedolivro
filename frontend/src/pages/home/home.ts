import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  livrosUrl: string = 'http://nodejs-mongo-persistent-app-clube-livro.7e14.starter-us-west-2.openshiftapps.com/livros';

  catalogoLivros: Array<any> = [];

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get(this.livrosUrl).map(res => res.json())
    .subscribe(
      data => {
        this.catalogoLivros = data;
        console.log('Livros retornados pelo serviço.');
        console.log(this.catalogoLivros);
        /*console.log('Contatos retornados pelo serviço. Gravando no localstorage');
        NativeStorage.setItem('contatos', this.colaboradores).then(
          () => console.log('Contatos gravados no localstorage!'),
          error => console.error('Erro gravando contatos no localstorage', error)
        );*/
      },
        error => {
          /*let toast = this.toastCtrl.create({
            message: 'Não foi possível carregar a lista de contatos. Você está conectado à rede WiFi interna?',
            duration: 3000,
            position: 'top'
          });
          toast.present();*/
        }
  ); 
  }

}
