import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  rootPage: any = HomePage;
  userInfo = {nome: "", email: "", autoLogin: true};

  constructor(public navCtrl: NavController, public storage: Storage, public toastController: ToastController) { 
    //console.log("construtor do login acionado!")
  }

  ngOnInit() {
    this.storage.get('usuarioLogado').then((usuarioLogado) => {
      if(usuarioLogado){
        console.log('Usuário Logado ' + usuarioLogado.nome);
        this.userInfo = usuarioLogado;
        if(usuarioLogado.autoLogin){
          this.navCtrl.navigateRoot('home');
        }
      }
    });
  }
  
  async presentToast() {
    
  }

  async entrar() {
    console.log(this.userInfo);
    if(this.userInfo && this.userInfo.nome !== "" && this.userInfo.email !== ""){
      //Salvar dados informados pelo usuário no localStorage
      this.storage.set('usuarioLogado', this.userInfo).then(
        () => console.log('Usuário gravado no localstorage!'),
        error => console.error('Erro gravando usuário no localstorage', error)
      );
  
      this.navCtrl.navigateRoot('home');
    } else {
      const toast = await this.toastController.create({
        message: 'Digite seu nome e e-mail',
        duration: 2000
      });
      toast.present();
    }
  }
}
