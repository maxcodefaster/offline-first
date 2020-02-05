import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StandardFormService as StandardFormService } from '../services/sicherheits-check.service';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab-1',
  templateUrl: './tab-1.page.html',
  styleUrls: ['./tab-1.page.scss'],
})
export class Tab1Page implements OnInit {

  standardForm: FormGroup;
  submitted = false;
  public loading: any;

  constructor(private fb: FormBuilder, private sicherheitsCheckService: StandardFormService,
              private alertController: AlertController, private toastController: ToastController, private router: Router, private userService: UserService,
              private authService: AuthService, private loadingCtrl: LoadingController, private navCtrl: NavController, ) {
    this.standardForm = this.fb.group({
      datum: new FormControl('', [
        Validators.required,
      ]),
      kunde: new FormControl('', [
        Validators.required,
      ]),
      bemerkung: new FormControl('', [
      ]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.standardForm.controls; }

  ngOnInit() {

    this.loadingCtrl.create({
      message: 'Authenticating...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();

      this.authService.reauthenticate().then((res) => {

        this.sicherheitsCheckService.init();
        this.loading.dismiss();


      }, (err) => {

        this.loading.dismiss();
        this.navCtrl.navigateRoot('/login');

      });
    });

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Formular übermittelt',
      duration: 4000,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  // save to Database
  saveForm() {
    this.submitted = true;
    if (!this.standardForm.invalid) {
      const form = this.standardForm.value;
      const iso = this.getDateISOString();
      form.dateCreated = iso;
      form.author = this.userService.currentUser.user_id,
        // save to Database
        this.sicherheitsCheckService.saveSicherheitsChecks(form).then((res: any) => {
          console.log(res);
          if (res.ok) {
            this.presentToast();
            this.router.navigateByUrl('/view-sicherheits-check/' + res.id);
            // this.resetForm(this.sicherheitsCheckForm);
          }
        });
    }
  }

  getDateISOString(): string {
    return new Date().toISOString();
  }

  hasFormError(formField) {
    if (!this.f[formField].valid && this.submitted) {
      return true;
    }
    return false;
  }

  resetForm(form: FormGroup) {
    form.reset();
    this.submitted = false;
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  logout(): void {
    this.authService.logout();
  }


}
