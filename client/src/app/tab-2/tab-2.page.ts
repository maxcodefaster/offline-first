import { Component, OnInit } from '@angular/core';
import { SharedDocService } from '../services/shared-doc.service';
import { ModalController, LoadingController, NavController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EditDocPage } from '../modals/edit-doc/edit-doc.page';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-tab-2',
  templateUrl: './tab-2.page.html',
  styleUrls: ['./tab-2.page.scss'],
})
export class Tab2Page implements OnInit {

  public sharedDocs: object[] = [];
  public loading: any;
  private user;

  constructor(
    private sharedDocService: SharedDocService,
    private authService: AuthService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
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
        'db': 'shared'
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
