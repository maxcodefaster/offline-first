import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slot = 'bottom';

  constructor(public platform: Platform, ) {
    if (!this.platform.is('mobile')) {
      this.slot = 'top';
    }
  }

}
