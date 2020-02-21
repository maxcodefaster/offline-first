import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.page.html',
  styleUrls: ['./forgot-pwd.page.scss'],
})
export class ForgotPwdPage implements OnInit {

  public forgotPwdForm: any;
  private loading: any;
  submitted = false;
  errMessage;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
  ) {
    this.forgotPwdForm = this.fb.group({
      email: ['',
        Validators.compose([
          Validators.maxLength(30),
          Validators.required,
          Validators.email
        ]),
      ],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotPwdForm.controls; }

  ngOnInit() {
    this.authService.reauthenticate().then((res) => {
      this.navCtrl.navigateRoot('/home/tab-1');
    }, (err) => {
    });
  }

  requestPwdReset(): void {
    this.submitted = true;
    if (this.forgotPwdForm.valid) {
      this.loadingCtrl.create({
        message: 'Sending new password...'
      }).then((overlay) => {
        this.loading = overlay;
        this.loading.present();
        this.authService.forgotPassword(this.forgotPwdForm.value).subscribe((res: any) => {
          this.errMessage = res.success;
          this.loading.dismiss();
        }, (err) => {
          this.errMessage = 'This email is not valid';
          this.loading.dismiss();
        });
      });
    }
  }
}
