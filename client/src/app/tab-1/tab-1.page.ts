import { Component, OnInit } from '@angular/core';
import { PrivateDocService } from '../services/private-doc.service';
import { ModalController, LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EditDocPage } from '../modals/edit-doc/edit-doc.page';


@Component({
  selector: 'app-tab-1',
  templateUrl: './tab-1.page.html',
  styleUrls: ['./tab-1.page.scss'],
})
export class Tab1Page implements OnInit {

  public privateDocs: object[] = [];
  public loading: any;
  user;

  constructor(
    private privateDocService: PrivateDocService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public actionSheetController: ActionSheetController,
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
        this.privateDocService.init();
        this.privateDocService.getPrivateDocs().subscribe((docs) => {
          this.privateDocs = docs;
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
      swipeToClose: true,
      componentProps: {
        'doc': doc
      }
    }).then((modal) => {
      modal.present();
    });
  }

  async presentActionSheet(doc) {
    const actionSheet = await this.actionSheetController.create({
      header: doc.title + ' - ' + doc.type + ' by ' + doc.author,
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.openModal(doc);
          }
        }, {
          text: 'Move to shared',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
    });
    await actionSheet.present();
  }

  logout(): void {
    this.authService.logout();
  }


}
