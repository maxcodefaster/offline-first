import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string;
  public password: string;
  public failedAttempt = false;
  public loading: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private dataService: DataService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    this.authService.reauthenticate().then((res) => {

      this.navCtrl.navigateRoot('/home/tab-1');

    }, (err) => {

    });
  }

  openRegisterPage(): void {
    this.navCtrl.navigateForward('/register');
  }

  login(): void {

    this.loadingCtrl.create({
      message: 'Authenticating...'
    }).then((overlay) => {

      this.loading = overlay;
      this.loading.present();

      const credentials = {
        username: this.username,
        password: this.password
      };

      this.authService.authenticate(credentials).subscribe((res: any) => {

        // console.log(res);

        if (typeof (res.token) !== 'undefined') {

          this.failedAttempt = false;

          this.zone.runOutsideAngular(() => {
            this.dataService.initDatabase(res);
          });

          this.userService.saveUserData(res);

          this.loading.dismiss().then(() => {
            this.navCtrl.navigateRoot('/home/tab-1');
          });

        }

      }, (err) => {

        this.loading.dismiss();
        this.failedAttempt = true;
        console.log(err);

      });

    });

  }

}
