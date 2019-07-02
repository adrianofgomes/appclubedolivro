import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LivrosApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LivrosApi {

  private livrosUrl = 'https://us-central1-appclubedolivro.cloudfunctions.net/livros';

  constructor(public http: HttpClient) {
    console.log('Hello LivrosApi Provider');
    console.log('URL: ' + this.livrosUrl);
  }

}
