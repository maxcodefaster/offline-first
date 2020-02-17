import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PrivateDocService } from 'src/app/services/private-doc.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDocService } from 'src/app/services/shared-doc.service';

@Component({
  selector: 'app-edit-doc-notice',
  templateUrl: './edit-doc.page.html',
  styleUrls: ['./edit-doc.page.scss'],
})
export class EditDocPage implements OnInit {

  submitted = false;
  existingDoc: any = false;
  db: String;
  loading: any;
  form: FormGroup;
  modalTitel: String = 'Add document';

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private privateDocService: PrivateDocService,
    private sharedDocService: SharedDocService,
    private userService: UserService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) {
    this.form = this.fb.group({
      title: new FormControl('', [
        Validators.required,
      ]),
      note: new FormControl('', [
      ]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Authenticating...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
      this.authService.reauthenticate().then((res) => {
        this.loading.dismiss();
      }), (err) => {
        this.loading.dismiss();
        this.navCtrl.navigateRoot('/login');
      }
    });
    if (typeof (this.navParams.get('doc')) !== 'undefined') {
      this.existingDoc = this.navParams.get('doc');
      this.form.patchValue({
        title: this.existingDoc.title,
        note: this.existingDoc.note
      })
      this.modalTitel = 'Edit document';
    }
    if (typeof (this.navParams.get('db')) !== 'undefined') {
      this.db = this.navParams.get('db');
    }
  }

  // save to Database
  saveForm() {
    this.submitted = true;
    if (!this.form.invalid) {
      const form = this.form.value;
      const iso = this.getDateISOString();
      if (this.db === 'private') {
        // save to Private Database
        this.privateDocService.savePrivateDocs({
          author: this.userService.currentUser.user_id,
          doc: this.existingDoc,
          title: form.title,
          note: form.note,
          dateCreated: iso,
          dateUpdated: iso
        }).then((res: any) => {
          if (res.ok) {
            this.close();
          }
        })
      } else {
        // save to Shared Database
        this.sharedDocService.saveSharedDocs({
          author: this.userService.currentUser.user_id,
          doc: this.existingDoc,
          title: form.title,
          note: form.note,
          dateCreated: iso,
          dateUpdated: iso
        }).then((res: any) => {
          if (res.ok) {
            this.close();
          }
        });
      }
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

  close(): void {
    this.modalCtrl.dismiss();
  }

}