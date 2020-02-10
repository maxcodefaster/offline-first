import { Component, OnInit } from '@angular/core';
import { SharedDocService } from '../services/shared-doc.service';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EditDocPage } from '../modals/edit-doc/edit-doc.page';


@Component({
  selector: 'app-tab-2',
  templateUrl: './tab-2.page.html',
  styleUrls: ['./tab-2.page.scss'],
})
export class Tab2Page implements OnInit {

  public sharedDocs: object[] = [];
  public loading: any;
  user;

  constructor(
    private sharedDocService: SharedDocService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {
  }


  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Authenticating...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
      this.authService.reauthenticate().then((res) => {
        this.sharedDocService.init();
        this.sharedDocService.getSharedDocs().subscribe((docs) => {
          this.sharedDocs = docs;
        });
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        this.navCtrl.navigateRoot('/login');
      });
    });
  }

  async openModal(doc?) {
    const modal = await this.modalController.create({
      component: EditDocPage,
      componentProps: {
        'doc': doc
      }
    }).then((modal) => {
      modal.present();
    });
  }

  logout(): void {
    this.authService.logout();
  }


}
