import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.page.html',
  styleUrls: ['./reset-pwd.page.scss'],
})
export class ResetPwdPage implements OnInit {

  public resetPwdForm: any;
  private loading: any;
  submitted = false;
  success = false;
  token;
  errMessage;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {
    this.resetPwdForm = this.fb.group({
      password: ['',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.required
        ])],
      confirmPassword: ['',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.required
        ])],
    }, {
      validator: this.confirmPassword
    });
  }

  ngOnInit() {
    this.authService.reauthenticate().then((res) => {
      this.navCtrl.navigateRoot('/home/tab-1');
    }, (err) => {
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPwdForm.controls; }

  confirmPassword(form) {
    let password = form.get('password');
    let confirmPassword = form.get('confirmPassword');
    let validation = {};
    if ((password.touched || confirmPassword.touched) && password.value !== confirmPassword.value) {
      validation = {
        passwordMismatch: true
      };
    }
    return validation;
  }

  resetPwd(): void {
    this.submitted = true;
    if (this.resetPwdForm.valid) {
      this.loadingCtrl.create({
        message: 'Resetting password...'
      }).then((overlay) => {
        this.loading = overlay;
        this.loading.present();
        this.resetPwdForm.value.token = this.token;
        this.authService.resetPassword(this.resetPwdForm.value).subscribe((res: any) => {
          this.errMessage = res.success;
          this.loading.dismiss();
          this.success = true;
        }, (err) => {
          this.errMessage = 'Reset Token is invalid.';
          this.loading.dismiss();
        });
      });
    }
  }
}
