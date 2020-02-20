import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsernameValidator {

    debouncer: any;

    constructor(
        public authService: AuthService
    ) { }

    checkUsername(control: FormControl): Promise<any> {
        clearTimeout(this.debouncer);

        if (control.value !== '') {
            return new Promise(resolve => {
                this.debouncer = setTimeout(() => {
                    this.authService.validateUsername(control.value).subscribe((res: any) => {
                        if (res.ok) {
                            resolve(null);
                        }
                    }, (err) => {
                        resolve({ 'usernameInUse': true });
                    });
                }, 1000);
            });
        }
    }
}