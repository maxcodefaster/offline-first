import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SicherheitsCheckService } from '../services/sicherheits-check.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';


@Component({
  selector: 'app-sicherheits-check',
  templateUrl: './sicherheits-check.page.html',
  styleUrls: ['./sicherheits-check.page.scss'],
})
export class SicherheitsCheckPage implements OnInit {

  sicherheitsCheckForm: FormGroup;
  dienstleistung = '';
  dienstleistungen = [ {text: 'putzen', value: 'A'} ];

  constructor(private fb: FormBuilder, private sicherheitsCheckService: SicherheitsCheckService, private pickerCtrl: PickerController) {
    this.sicherheitsCheckForm = this.fb.group({
      datum: new FormControl('', [
        Validators.required,
      ]),
      kunde: new FormControl('', [
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
      gefährdungen_bewusst: new FormControl('n.e.', [
        Validators.required,
      ]),
      gefährdungen_bewusst_ft: new FormControl('', [
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
      prüfplakette: new FormControl('n.e.', [
        Validators.required,
      ]),
      prüfplakette_ft: new FormControl('', [
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
      hebebühne: new FormControl('n.e.', [
        Validators.required,
      ]),
      hebebühne_ft: new FormControl('', [
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
    });
  }

  ngOnInit() {
  }

  async showBasicPicker() {
    let opts: PickerOptions = {
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
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('Dienstleistungen');
      this.dienstleistung = col.options[col.selectedIndex].text;
    });
  }

  saveSicherheitsCheck() {

    if (!this.sicherheitsCheckForm.invalid) {
      const form = this.sicherheitsCheckForm.value;
      const iso = this.getDateISOString();
      form.dateCreated = iso;
      // save to Database
      this.sicherheitsCheckService.saveSicherheitsChecks(form);
    }

  }

  getDateISOString(): string {
    return new Date().toISOString();
  }


}
