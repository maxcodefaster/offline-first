import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: any = false;

  constructor(public storage: Storage) {}

  saveUserData(data): void {
    this.currentUser = data;
    this.storage.set('gesaQSUserData', data);
  }

  getUserData(): Promise<any> {
    return this.storage.get('gesaQSUserData');
  }

}
