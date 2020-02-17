import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PrivateDocService } from 'src/app/services/private-doc.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-doc-notice',
  templateUrl: './edit-doc.page.html',
  styleUrls: ['./edit-doc.page.scss'],
})
export class EditDocPage implements OnInit {

  title: string = '';
  note: string = '';
  submitted = false;
  existingDoc: any = false;
  privateForm: FormGroup;
  modalTitel = 'Add document';

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private privateDocService: PrivateDocService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.privateForm = this.fb.group({
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
    console.log(this.navParams.get('doc'));
    if (typeof (this.navParams.get('doc')) !== 'undefined') {
      this.existingDoc = this.navParams.get('doc');
      this.title = this.existingDoc.title;
      this.note = this.existingDoc.message;
      this.modalTitel = 'Edit document';
    }
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
            this.close();
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

  close(): void {
    this.modalCtrl.dismiss();
  }

}