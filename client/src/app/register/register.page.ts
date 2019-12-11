import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: any;
  private loading: any;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private loadingCtrl: LoadingController
  ) {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    });

  }

  ngOnInit() {

  }

  createAccount(): void {

    if (this.registerForm.valid) {

      this.loadingCtrl.create({
        message: 'Creating Account...'
      }).then((overlay) => {

        this.loading = overlay;
        this.loading.present();

        this.authService.register(this.registerForm.value).subscribe((res: any) => {

          console.log(res);
          if (typeof (res.token) !== 'undefined') {

            this.dataService.initDatabase(res);
            this.userService.saveUserData(res);

            this.navCtrl.navigateRoot('/home/sicherheits-check');

          }

          this.loading.dismiss();

        }, (err) => {
          this.loading.dismiss();
        });

      });

    }

  }

}
