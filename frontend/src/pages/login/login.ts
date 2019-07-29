import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //@ViewChild(Nav) nav: Nav;
  
  rootPage: any = HomePage;
  userInfo = {nome: "", email: ""};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
    //this.userInfo.nome = "";
    //this.userInfo.email = "";
  }

  entrar() {
    console.log(this.userInfo);
    //Salvar dados informados pelo usuário no localStorage
    this.nativeStorage.setItem('usuarioLogado', this.userInfo).then(
      () => console.log('Usuário gravado no localstorage!'),
      error => console.error('Erro gravando usuário no localstorage', error)
    );

    this.navCtrl.setRoot(this.rootPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
