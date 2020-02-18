import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  submitted = false;
  errMessage;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private loadingCtrl: LoadingController
  ) {
    this.registerForm = this.fb.group({
      username: new FormControl('', [
        Validators.maxLength(16),
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.maxLength(30),
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.required
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.required
      ]),
      role: new FormControl(false, [
        Validators.required
      ])
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

  hasFormError(formField) {
    if (!this.f[formField].valid && this.submitted) {
      return true;
    }
    return false;
  }

  createAccount(): void {
    this.submitted = true;
    if (!this.registerForm.invalid) {
      this.loadingCtrl.create({
        message: 'Creating Account...'
      }).then((overlay) => {
        this.loading = overlay;
        this.loading.present();
        // check if value was given for role else set default - this needs to be fixed in front end and maybe be dynamic
        if (!this.registerForm.value.role) {
          this.registerForm.value.role = 'user';
        };
        this.authService.register(this.registerForm.value).subscribe((res: any) => {
          if (typeof (res.token) !== 'undefined') {
            this.dataService.initDatabase(res);
            this.userService.saveUserData(res);
            this.navCtrl.navigateRoot('/home/tab-1');
          }
          this.loading.dismiss();
        }, (err) => {
          this.errMessage = Object.values(err.error.validationErrors)[0];
          this.loading.dismiss();
        });
      });
    }
  }
}
