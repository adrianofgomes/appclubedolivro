import { Component, OnInit } from '@angular/core';
import { LivrosAPIService } from '../livros-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.page.html',
  styleUrls: ['./livro-detalhe.page.scss'],
})
export class LivroDetalhePage implements OnInit {

  livro: any;

  constructor(public livrosAPI: LivrosAPIService, private activatedRoute: ActivatedRoute) { 
    this.livro = "";
  }

  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.livrosAPI.get(id).then(
      (data:any) => {
        //this.catalogoLivros = data;
        //loader.dismiss();
        console.log('Livros retornados pelo serviço.' + data);
        this.livro = data;
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
    )}

}
