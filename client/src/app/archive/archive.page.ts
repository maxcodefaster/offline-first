import { Component, OnInit } from '@angular/core';
import { SicherheitsCheckService } from '../services/sicherheits-check.service';
import { AuthService } from '../services/auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {

  public formulare: object[] = [];
  public loading: any;
  user;

  constructor(private sicherheitsCheckService: SicherheitsCheckService, private userService: UserService,
    private authService: AuthService, private loadingCtrl: LoadingController, private navCtrl: NavController, ) { }



  ngOnInit() {

    this.loadingCtrl.create({
      message: 'Authenticating...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();

      this.authService.reauthenticate().then((res) => {

        this.sicherheitsCheckService.init();

        this.sicherheitsCheckService.getSicherheitsChecks().subscribe((formulare) => {

          this.formulare = formulare;

        });

        this.loading.dismiss();

      }, (err) => {

        this.loading.dismiss();
        this.navCtrl.navigateRoot('/login');

      });
    });

  }

}
