import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  livrosUrl: string = 'https://us-central1-appclubedolivro.cloudfunctions.net/livros';
  catalogoLivros: Array<any> = [];

  constructor(private router: Router, public http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.http.get(this.livrosUrl).subscribe(
      (data:any) => {
        this.catalogoLivros = data;
        //loader.dismiss();
        console.log('Livros retornados pelo serviço.');
        //console.log(this.catalogoLivros);
        /*console.log('Contatos retornados pelo serviço. Gravando no localstorage');
        NativeStorage.setItem('contatos', this.colaboradores).then(
          () => console.log('Contatos gravados no localstorage!'),
          error => console.error('Erro gravando contatos no localstorage', error)
        );*/
      },
        error => {
          console.log('Erro!');
          /*loader.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Não foi possível carregar o catálogo de livros. Verifique sua conexão com a Internet',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();*/
        }
    )
  }

  detalhes(detalhe: any) {
    console.log(detalhe);
    this.router.navigate(['/livro-detalhe', detalhe.id])
  }

}
