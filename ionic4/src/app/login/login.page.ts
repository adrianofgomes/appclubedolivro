import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home.page';
import { LoginService } from './login.service';
import { UserEntity } from '../entity/user.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  rootPage: any = HomePage;
  userInfo: UserEntity;

  constructor(public navCtrl: NavController, public storage: Storage, public toastController: ToastController, public loginService: LoginService) { 
    //console.log("construtor do login acionado!")
    this.userInfo = new UserEntity();
  }

  async ngOnInit() {
    var usuarioLogado = await this.loginService.getUsuarioLogado();
    if(usuarioLogado){
      console.log('usuário logado recuperado:' + usuarioLogado.nome);
      this.userInfo = usuarioLogado;
      if(this.userInfo.autoLogin){
        this.navCtrl.navigateRoot('home');
      }
    } else {
      console.log('usuário não recuperado');
    }
  }
  
  async presentToast() {
    
  }

  async entrar() {
    console.log(this.userInfo);
    if(this.userInfo && this.userInfo.nome !== "" && this.userInfo.email !== ""){
      //Salvar dados informados pelo usuário no localStorage
      this.loginService.login(this.userInfo);
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
