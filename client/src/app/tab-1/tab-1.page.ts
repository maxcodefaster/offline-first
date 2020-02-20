import { Component, OnInit } from '@angular/core';
import { PrivateDocService } from '../services/private-doc.service';
import { ModalController, LoadingController, NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EditDocPage } from '../modals/edit-doc/edit-doc.page';
import { UserService } from '../services/user.service';


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
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public alertController: AlertController,
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
        this.user = this.userService.currentUser;
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
        'doc': doc,
        'db': 'private'
      }
    }).then((modal) => {
      modal.present();
    });
  }

  async presentActionSheet(doc) {
    let canClick = 'actionSheetButtonInvisible';
    if (doc.author === this.user.user_id || this.user.roles[0] === 'admin') {
      canClick = '';
    }
    const actionSheet = await this.actionSheetController.create({
      translucent: true,
      header: doc.title + ' - ' + doc.type + ' by ' + doc.author,
      buttons: [
        {
          text: 'Edit',
          cssClass: canClick,
          icon: 'pencil',
          handler: () => {
            this.openModal(doc);
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          cssClass: canClick,
          icon: 'trash',
          handler: () => {
            this.presentDeleteConfirm(doc);
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

  async presentDeleteConfirm(doc) {
    const alert = await this.alertController.create({
      translucent: true,
      header: 'Delete',
      message: 'Do you want to delete <strong>' + doc.title + '</strong> ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteDoc(doc);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteDoc(doc) {
    this.privateDocService.deletePrivateDoc(doc);
  }

  logout(): void {
    this.authService.logout();
  }


}
