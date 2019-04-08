import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LivrosApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LivrosApi {

  private livrosUrl = 'http://nodejs-mongo-persistent-app-clube-livro.7e14.starter-us-west-2.openshiftapps.com/livros';

  constructor(public http: HttpClient) {
    console.log('Hello LivrosApi Provider');
    console.log('URL: ' + this.livrosUrl);
  }

}
