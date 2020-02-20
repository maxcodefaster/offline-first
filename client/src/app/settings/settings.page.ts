import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public loading: any;
  darkMode = false;
  user;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private theme: ThemeService,
  ) { }

  ngOnInit() {
    this.darkMode = this.theme.darkMode;
    this.loadingCtrl.create({
      translucent: true,
      message: 'Authenticating...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
      this.authService.reauthenticate().then((res) => {
        this.user = this.userService.currentUser;
        console.log(this.user);
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        this.navCtrl.navigateRoot('/login');
      });
    });
  }

  toggleDarkMode(e) {
    if (this.theme.darkMode) {
      this.theme.enableLight();
      this.darkMode = this.theme.darkMode;
    } else {
      this.theme.enableDark();
      this.darkMode = this.theme.darkMode;
    }
  }

}
