import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PrivateDocService } from '../services/private-doc.service';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab-2',
  templateUrl: './tab-2.page.html',
  styleUrls: ['./tab-2.page.scss'],
})
export class Tab2Page implements OnInit {


  constructor(
    private fb: FormBuilder,
    private DocService: PrivateDocService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }

}
