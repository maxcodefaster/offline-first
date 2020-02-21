import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class EmailAvailableValidator {

    debouncer: any;

    constructor(
        public authService: AuthService
    ) { }

    checkEmail(control: FormControl): Promise<any> {
        clearTimeout(this.debouncer);

        if (control.value !== '') {
            return new Promise(resolve => {
                this.debouncer = setTimeout(() => {
                    this.authService.validateEmail(control.value).subscribe((res: any) => {
                        if (res.ok) {
                            resolve(null);
                        }
                    }, (err) => {
                        resolve({ 'emailAvailable': true });
                    });
                }, 1000);
            });
        }
    }
}