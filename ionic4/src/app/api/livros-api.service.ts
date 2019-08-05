import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivrosAPIService {
  
  livrosUrl: string = 'https://us-central1-appclubedolivro.cloudfunctions.net/livros';

  constructor(public http: HttpClient) { }

  getAll() {
    return new Promise((resolve, reject) => {
      let url = this.livrosUrl;
 
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }
  
  get(id: string) {
    return new Promise((resolve, reject) => {
      let url = this.livrosUrl + "/" + id;
 
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }

}
