import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  livrosUrl: string = 'https://us-central1-appclubedolivro.cloudfunctions.net/livros';

  catalogoLivros: Array<any> = [];

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    const loader = this.loadingCtrl.create({
      content: "Carregando catálogo de livros..."//,
      //duration: 3000
    });
    loader.present();
    this.http.get(this.livrosUrl).map(res => res.json())
    .subscribe(
      data => {
        this.catalogoLivros = data;
        loader.dismiss();
        console.log('Livros retornados pelo serviço.');
        //console.log(this.catalogoLivros);
        /*console.log('Contatos retornados pelo serviço. Gravando no localstorage');
        NativeStorage.setItem('contatos', this.colaboradores).then(
          () => console.log('Contatos gravados no localstorage!'),
          error => console.error('Erro gravando contatos no localstorage', error)
        );*/
      },
        error => {
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Não foi possível carregar o catálogo de livros. Verifique sua conexão com a Internet',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
  ); 
  }

}
