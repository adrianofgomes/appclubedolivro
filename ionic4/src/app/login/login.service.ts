import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserEntity } from '../entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioLogado: UserEntity;

  constructor(public storage: Storage) { 
    this.usuarioLogado = undefined;
  }

  async login(userInfo: UserEntity){
    if(userInfo && userInfo.nome !== "" && userInfo.email !== ""){
      //Salvar dados informados pelo usuário no localStorage
      await this.storage.set('usuarioLogado', userInfo);/*.then(
        () => console.log('Usuário gravado no localstorage!'),
        error => console.error('Erro gravando usuário no localstorage', error)
      );*/
    }
  }

  async getUsuarioLogado() {
    //console.log(this.usuarioLogado);
    if(this.usuarioLogado == undefined) {
      this.usuarioLogado = await this.storage.get('usuarioLogado');
      return this.usuarioLogado;
    } else {
      console.log('usuário já logado');
      return this.usuarioLogado;
    }
  }

  async deslogar(){
    console.log(this.usuarioLogado)
    if(this.usuarioLogado){
      this.usuarioLogado.autoLogin = false;
      console.log('novo usuário gravado no localstorage');
      console.log(this.usuarioLogado);
      await this.storage.set('usuarioLogado', this.usuarioLogado);
    }
  }
}
