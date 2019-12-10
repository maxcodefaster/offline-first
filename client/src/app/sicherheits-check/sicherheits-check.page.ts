import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SicherheitsCheckService } from '../services/sicherheits-check.service';
import { DienstleistungService } from '../services/dienstleistung.service';
import { TeamleiterService } from '../services/teamleiter.service';
import { TechnikerService } from '../services/techniker.service';
import { PickerController, LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sicherheits-check',
  templateUrl: './sicherheits-check.page.html',
  styleUrls: ['./sicherheits-check.page.scss'],
})
export class SicherheitsCheckPage implements OnInit {

  sicherheitsCheckForm: FormGroup;
  dienstleistung = '';
  techniker = '';
  teamleiter = '';
  teamleiterList = [];
  technikerList = [];
  dienstleistungen = [{ text: 'Andere...', value: 'A' }];
  submitted = false;
  public loading: any;

  constructor(private fb: FormBuilder, private sicherheitsCheckService: SicherheitsCheckService,
    private dienstleistungService: DienstleistungService, private teamleiterService: TeamleiterService,
    private technikerService: TechnikerService, private pickerCtrl: PickerController,
    private alertController: AlertController, private toastController: ToastController, private router: Router, private userService: UserService,
    private authService: AuthService, private loadingCtrl: LoadingController, private navCtrl: NavController, ) {
    this.sicherheitsCheckForm = this.fb.group({
      datum: new FormControl('', [
        Validators.required,
      ]),
      kunde: new FormControl('', [
        Validators.required,
      ]),
      dienstleistung: new FormControl('', [
        Validators.required,
      ]),
      teamleiter: new FormControl('', [
        Validators.required,
      ]),
      techniker: new FormControl('', [
        Validators.required,
      ]),
      asi_schulung: new FormControl('n.e.', [
        Validators.required,
      ]),
      asi_schulung_ft: new FormControl('', [
      ]),
      psa_festgelegt: new FormControl('n.e.', [
        Validators.required,
      ]),
      psa_festgelegt_ft: new FormControl('', [
      ]),
      ba_vorhanden: new FormControl('n.e.', [
        Validators.required,
      ]),
      ba_vorhanden_ft: new FormControl('', [
      ]),
      gefaehrdungen_bewusst: new FormControl('n.e.', [
        Validators.required,
      ]),
      gefaehrdungen_bewusst_ft: new FormControl('', [
      ]),
      erstunterweisung: new FormControl('n.e.', [
        Validators.required,
      ]),
      erstunterweisung_ft: new FormControl('', [
      ]),
      ersthelfer_vor_ort: new FormControl('n.e.', [
        Validators.required,
      ]),
      ersthelfer_vor_ort_ft: new FormControl('', [
      ]),
      medizinisch_untersucht: new FormControl('n.e.', [
        Validators.required,
      ]),
      medizinisch_untersucht_ft: new FormControl('', [
      ]),
      pruefplakette: new FormControl('n.e.', [
        Validators.required,
      ]),
      pruefplakette_ft: new FormControl('', [
      ]),
      verbote: new FormControl('n.e.', [
        Validators.required,
      ]),
      verbote_ft: new FormControl('', [
      ]),
      ausweise: new FormControl('n.e.', [
        Validators.required,
      ]),
      ausweise_ft: new FormControl('', [
      ]),
      hebebuehne: new FormControl('n.e.', [
        Validators.required,
      ]),
      hebebuehne_ft: new FormControl('', [
      ]),
      verbandskasten: new FormControl('n.e.', [
        Validators.required,
      ]),
      verbandskasten_ft: new FormControl('', [
      ]),
      sicherheitsbekleidung: new FormControl('n.e.', [
        Validators.required,
      ]),
      sicherheitsbekleidung_ft: new FormControl('', [
      ]),
      handschuhe: new FormControl('n.e.', [
        Validators.required,
      ]),
      handschuhe_ft: new FormControl('', [
      ]),
      schutzbrille: new FormControl('n.e.', [
        Validators.required,
      ]),
      schutzbrille_ft: new FormControl('', [
      ]),
      schutzmaske: new FormControl('n.e.', [
        Validators.required,
      ]),
      schutzmaske_ft: new FormControl('', [
      ]),
      fanggurt: new FormControl('n.e.', [
        Validators.required,
      ]),
      fanggurt_ft: new FormControl('', [
      ]),
      erneute_unterweisung: new FormControl('n.e.', [
        Validators.required,
      ]),
      erneute_unterweisung_ft: new FormControl('', [
      ]),
      bemerkung: new FormControl('', [
      ]),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.sicherheitsCheckForm.controls; }

  ngOnInit() {

    this.loadingCtrl.create({
      message: 'Authenticating...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();

      this.authService.reauthenticate().then((res) => {

        this.sicherheitsCheckService.init();
        this.loading.dismiss();
        this.getResources();


      }, (err) => {

        this.loading.dismiss();
        this.navCtrl.navigateRoot('/login');

      });
    });

  }

  getResources() {
    this.getDiensleistungen();
    this.getTeamleiter();
    this.getTechniker();
  }

  getDiensleistungen() {
    this.dienstleistungService.init();

    this.dienstleistungService.getDienstleistung().subscribe((dienstleistung: { name: string, type: string }[]) => {
      for (const item of dienstleistung) {
        this.dienstleistungen.push({ text: item.name, value: item.name });
      }
    });
  }

  getTeamleiter() {
    this.teamleiterService.init();

    this.teamleiterService.getTeamleiter().subscribe((teamleiter: { name: string, type: string }[]) => {
      for (const item of teamleiter) {
        this.teamleiterList.push({ text: item.name, value: item.name });
      }
    });
  }

  getTechniker() {
    this.technikerService.init();

    this.technikerService.getTechniker().subscribe((techniker: { name: string, type: string }[]) => {
      for (const item of techniker) {
        this.technikerList.push({ text: item.name, value: item.name });
      }
    });
  }

  async showDlPicker() {
    const opts: PickerOptions = {
      buttons: [
        {
          text: 'Zurück',
          role: 'cancel'
        },
        {
          text: 'OK'
        }
      ],
      columns: [
        {
          name: 'Dienstleistungen',
          options: this.dienstleistungen,
        }
      ]
    };
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('Dienstleistungen');
      this.dienstleistung = col.options[col.selectedIndex].text;
      if (this.dienstleistung === 'Andere...') {
        this.dienstleistung = '';
        this.presentAlertPrompt();
      }
    });
  }

  async showTlPicker() {
    const opts: PickerOptions = {
      buttons: [
        {
          text: 'Zurück',
          role: 'cancel'
        },
        {
          text: 'OK'
        }
      ],
      columns: [
        {
          name: 'Teamleiter',
          options: this.teamleiterList,
        }
      ]
    };
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('Teamleiter');
      this.teamleiter = col.options[col.selectedIndex].text;
    });
  }

  async showTechnikerPicker() {
    const opts: PickerOptions = {
      buttons: [
        {
          text: 'Zurück',
          role: 'cancel'
        },
        {
          text: 'OK'
        }
      ],
      columns: [
        {
          name: 'Servicetechniker',
          options: this.technikerList,
        }
      ]
    };
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('Servicetechniker');
      this.techniker = col.options[col.selectedIndex].text;
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Formular übermittelt',
      duration: 4000,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Fügen Sie eine andere Dienstleistung hinzu',
      inputs: [
        {
          name: 'custom_dl',
          type: 'text',
          placeholder: 'Dienstleistung'
        },
      ],
      buttons: [
        {
          text: 'Zurück',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok');
            if (data.custom_dl) {
              this.dienstleistung = data.custom_dl;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // save to Database
  saveSicherheitsCheck() {
    this.submitted = true;
    if (!this.sicherheitsCheckForm.invalid) {
      const form = this.sicherheitsCheckForm.value;
      const iso = this.getDateISOString();
      form.dateCreated = iso;
      form.author = this.userService.currentUser.user_id,
        // save to Database
        this.sicherheitsCheckService.saveSicherheitsChecks(form).then((res: any) => {
          if (res.ok) {
            this.presentToast();
            this.router.navigateByUrl('/view-sicherheits-check/' + res.id);
            // this.resetForm(this.sicherheitsCheckForm);
          }
        });
    }
  }

  getDateISOString(): string {
    return new Date().toISOString();
  }

  hasFormError(formField) {
    if (!this.f[formField].valid && this.submitted) {
      return true;
    }
    return false;
  }

  resetForm(form: FormGroup) {
    form.reset();
    this.dienstleistung = '';
    this.techniker = '';
    this.teamleiter = '';
    this.submitted = false;
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
  }

  logout(): void {
    this.authService.logout();
  }


}
