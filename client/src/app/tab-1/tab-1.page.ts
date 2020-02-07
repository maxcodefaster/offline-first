import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PrivateDocService } from '../services/private-doc.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab-1',
  templateUrl: './tab-1.page.html',
  styleUrls: ['./tab-1.page.scss'],
})
export class Tab1Page implements OnInit {

  privateForm: FormGroup;
  submitted = false;
  public loading: any;

  constructor(
    private fb: FormBuilder,
    private privateDocService: PrivateDocService,
    private toastController: ToastController,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
    this.privateForm = this.fb.group({
      date: new FormControl('', [
        Validators.required,
      ]),
      title: new FormControl('', [
        Validators.required,
      ]),
      note: new FormControl('', [
      ]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.privateForm.controls; }

  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Authenticating...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
      this.authService.reauthenticate().then((res) => {
        this.privateDocService.init();
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        this.navCtrl.navigateRoot('/login');
      });
    });

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Doc transmitted',
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
    if (!this.privateForm.invalid) {
      const form = this.privateForm.value;
      const iso = this.getDateISOString();
      form.dateCreated = iso;
      form.author = this.userService.currentUser.user_id,
        // save to Database
        this.privateDocService.savePrivateDocs(form).then((res: any) => {
          console.log(res);
          if (res.ok) {
            this.presentToast();
            this.router.navigateByUrl('/view-document/' + res.id);
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
