import { Component, Input, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {

  @Input('control') control: FormControl;
  public errorMessages: any;

  constructor(public zone: NgZone) {
    this.errorMessages = {
      'required': 'This field must not be empty',
      'emailInUse': 'You can\'t use this email address',
      'usernameInUse': 'You can\'t use this username',
      'maxlength': 'Must be less than 30 characters',
      'minlength': 'Must be more than 6 characters',
      'passwordMismatch': 'Passwords do not match',
      'pattern': 'Only numbers & letters',
    };
  }

  get errorMessage() {
    for (let error in this.control.errors) {
      if (this.control.errors.hasOwnProperty(error) && (this.control.touched || (this.control.asyncValidator !== null && !this.control.pristine))) {
        return this.errorMessages[error];
      }
    }
    return null;
  }
}