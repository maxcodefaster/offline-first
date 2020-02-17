import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PrivateDocService } from 'src/app/services/private-doc.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-doc-notice',
  templateUrl: './edit-doc.page.html',
  styleUrls: ['./edit-doc.page.scss'],
})
export class EditDocPage implements OnInit {

  submitted = false;
  existingDoc: any = false;
  privateForm: FormGroup;
  modalTitel = 'Add document';

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private privateDocService: PrivateDocService,
    private userService: UserService,
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
    if (typeof (this.navParams.get('doc')) !== 'undefined') {
      this.existingDoc = this.navParams.get('doc');
      console.log(this.existingDoc);
      this.privateForm.patchValue({
        title: this.existingDoc.title,
        note: this.existingDoc.note
      })
      this.modalTitel = 'Edit document';
    }
  }

  // save to Database
  saveForm() {
    this.submitted = true;
    if (!this.privateForm.invalid) {
      const form = this.privateForm.value;
      const iso = this.getDateISOString();
      form.author = this.userService.currentUser.user_id,
        // save to Database
        this.privateDocService.savePrivateDocs({
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