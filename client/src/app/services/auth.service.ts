import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { UserService } from './user.service';
import { DataService } from './data.service';
import { SERVER_ADDRESS } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private dataService: DataService,
    private navCtrl: NavController,
    private zone: NgZone
  ) {

  }

  authenticate(credentials) {

    return this.http.post(SERVER_ADDRESS + 'auth/login', credentials);

  }

  logout() {

    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.userService.currentUser.token + ':' + this.userService.currentUser.password);

    this.http.post(SERVER_ADDRESS + 'auth/logout', {}, { headers }).subscribe((res) => { });

    this.dataService.db.destroy().then((res) => {
      this.dataService.db = null;
      this.userService.saveUserData(null);
      this.navCtrl.navigateRoot('/login');

    }, (err) => {
      console.log('could not destroy db');
    });

  }

  register(details) {

    return this.http.post(SERVER_ADDRESS + 'auth/register', details);

  }

  validateUsername(username) {

    return this.http.get(SERVER_ADDRESS + 'auth/validate-username/' + username);

  }

  validateEmail(email) {

    const encodedEmail = encodeURIComponent(email);

    return this.http.get(SERVER_ADDRESS + 'auth/validate-email/' + encodedEmail);

  }

  reauthenticate() {
    return new Promise((resolve, reject) => {

      if (this.dataService.db === null) {

        this.userService.getUserData().then((userData) => {

          if (userData !== null) {

            const now = new Date();
            const expires = new Date(userData.expires);

            if (expires > now) {
              this.userService.currentUser = userData;

              this.zone.runOutsideAngular(() => {
                this.dataService.initDatabase(userData);
              });

              resolve(true);

            } else {
              reject(true);
            }

          } else {
            reject(true);
          }

        });

      } else {
        resolve(true);

      }

    });

  }

}
