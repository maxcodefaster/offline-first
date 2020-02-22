import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UsernameValidator } from '../../validators/username';
import { EmailAvailableValidator } from '../../validators/email-available';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: any;
  private loading: any;
  submitted = false;
  success;
  errMessage;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private usernameValidator: UsernameValidator,
    private emailValidator: EmailAvailableValidator,
  ) {
    this.registerForm = this.fb.group({
      username: ['',
        Validators.compose([
          Validators.maxLength(16),
          Validators.pattern('[a-zA-Z0-9]*'),
          Validators.required
        ]),
        usernameValidator.checkUsername.bind(usernameValidator)
      ],
      email: ['',
        Validators.compose([
          Validators.maxLength(30),
          Validators.required
        ]),
        emailValidator.checkEmail.bind(emailValidator)
      ],
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
      role: ['user',
        Validators.compose([
          Validators.required
        ])]
    }, {
      validator: this.confirmPassword
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.authService.reauthenticate().then((res) => {
      this.navCtrl.navigateRoot('/home/tab-1');
    }, (err) => {
    });
  }

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

  createAccount(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loadingCtrl.create({
        message: 'Creating Account...'
      }).then((overlay) => {
        this.loading = overlay;
        this.loading.present();
        this.authService.register(this.registerForm.value).subscribe((res: any) => {
          this.success = 'Hurray! Your account has been created. Check your email inbox to confirm your account.';
          this.loading.dismiss();
        }, (err) => {
          this.errMessage = Object.values(err.error.validationErrors)[0];
          this.loading.dismiss();
        });
      });
    }
  }
}
