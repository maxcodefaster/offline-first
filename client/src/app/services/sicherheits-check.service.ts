import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SicherheitsCheckService {

  sicherheitsCheckSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {

  }

  init(): void {

    this.emitSicherheitsChecks();

    this.dataService.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {

            if (change.doc.type === 'sicherheitsCheck' || change.deleted) {
                this.emitSicherheitsChecks();
            }

        });

  }

  getSingleSicherheitsCheck(id) {
    return this.dataService.db.get(id);
  }

  getSicherheitsChecks(): BehaviorSubject<object[]> {
    return this.sicherheitsCheckSubject;
  }

  saveSicherheitsChecks(sicherheitsCheck) {
    console.log(sicherheitsCheck.author);

    if (sicherheitsCheck.doc) {

      const updatedDoc = sicherheitsCheck.doc;

      updatedDoc.kunde = sicherheitsCheck.kunde;
      updatedDoc.dienstleistung = sicherheitsCheck.dienstleistung;
      updatedDoc.dateUpdated = sicherheitsCheck.dateUpdated;
      updatedDoc.dienstleistung = sicherheitsCheck.dienstleistung;
      updatedDoc.teamleiter = sicherheitsCheck.teamleiter;
      updatedDoc.techniker = sicherheitsCheck.techniker;
      updatedDoc.asi_schulung = sicherheitsCheck.asi_schulung;
      updatedDoc.asi_schulung_ft = sicherheitsCheck.asi_schulung_ft;
      updatedDoc.psa_festgelegt = sicherheitsCheck.psa_festgelegt;
      updatedDoc.psa_festgelegt_ft = sicherheitsCheck.psa_festgelegt_ft;
      updatedDoc.ba_vorhanden = sicherheitsCheck.ba_vorhanden;
      updatedDoc.ba_vorhanden_ft = sicherheitsCheck.ba_vorhanden_ft;
      updatedDoc.geaehrdungen_bewusst = sicherheitsCheck.gefaehrdungen_bewusst;
      updatedDoc.gefaehrdungen_bewusst_ft = sicherheitsCheck.gefaehrdungen_bewusst_ft;
      updatedDoc.erstunterweisung = sicherheitsCheck.erstunterweisung;
      updatedDoc.erstunterweisung_ft = sicherheitsCheck.erstunterweisung_ft;
      updatedDoc.ersthelfer_vor_ort = sicherheitsCheck.ersthelfer_vor_ort;
      updatedDoc.ersthelfer_vor_ort_ft = sicherheitsCheck.ersthelfer_vor_ort_ft;
      updatedDoc.medizinisch_untersucht = sicherheitsCheck.medizinisch_untersucht;
      updatedDoc.medizinisch_untersucht_ft = sicherheitsCheck.medizinisch_untersucht_ft;
      updatedDoc.pruefplakette = sicherheitsCheck.pruefplakette;
      updatedDoc.pruefplakette_ft = sicherheitsCheck.pruefplakette_ft;
      updatedDoc.verbote = sicherheitsCheck.verbote;
      updatedDoc.verbote_ft = sicherheitsCheck.verbote_ft;
      updatedDoc.ausweise = sicherheitsCheck.ausweise;
      updatedDoc.ausweise_ft = sicherheitsCheck.ausweise_ft;
      updatedDoc.sicherheitsbekleidung = sicherheitsCheck.sicherheitsbekleidung;
      updatedDoc.sicherheitsbekleidung_ft = sicherheitsCheck.sicherheitsbekleidung_ft;
      updatedDoc.handschuhe = sicherheitsCheck.handschuhe;
      updatedDoc.handschuhe_ft = sicherheitsCheck.handschuhe_ft;
      updatedDoc.schutzbrille = sicherheitsCheck.schutzbrille;
      updatedDoc.schutzbrille_ft = sicherheitsCheck.schutzbrille_ft;
      updatedDoc.schutzmaske = sicherheitsCheck.schutzmaske;
      updatedDoc.schutzmaske_ft = sicherheitsCheck.schutzmaske_ft;
      updatedDoc.fanggurt = sicherheitsCheck.fanggurt;
      updatedDoc.fanggurt_ft = sicherheitsCheck.fanggurt_ft;
      updatedDoc.hebebuehne = sicherheitsCheck.hebebuehne;
      updatedDoc.hebebuehne_ft = sicherheitsCheck.hebebuehne_ft;
      updatedDoc.verbandskasten = sicherheitsCheck.verbandskasten;
      updatedDoc.verbandskasten_ft = sicherheitsCheck.verbandskasten_ft;
      updatedDoc.erneute_unterweisung = sicherheitsCheck.erneute_unterweisung;
      updatedDoc.erneute_unterweisung_ft = sicherheitsCheck.erneute_unterweisung_ft;
      updatedDoc.bemerkung = sicherheitsCheck.bemerkung;
      updatedDoc.unterschrift_pruefer = sicherheitsCheck.unterschrift_pruefer;
      updatedDoc.unterschrift_teamleiter = sicherheitsCheck.unterschrift_teamleiter;
      updatedDoc.unterschrift_techniker = sicherheitsCheck.unterschrift_techniker;

      return this.dataService.updateDoc(updatedDoc);

    } else {
      return this.dataService.createDoc({
        kunde: sicherheitsCheck.kunde,
        author: sicherheitsCheck.author,
        dateCreated: sicherheitsCheck.dateCreated,
        dateUpdated: sicherheitsCheck.dateUpdated,
        type: 'sicherheitsCheck',
        dienstleistung: sicherheitsCheck.dienstleistung,
        teamleiter: sicherheitsCheck.teamleiter,
        techniker: sicherheitsCheck.techniker,
        asi_schulung: sicherheitsCheck.asi_schulung,
        asi_schulung_ft: sicherheitsCheck.asi_schulung_ft,
        psa_festgelegt: sicherheitsCheck.psa_festgelegt,
        psa_festgelegt_ft: sicherheitsCheck.psa_festgelegt_ft,
        ba_vorhanden: sicherheitsCheck.ba_vorhanden,
        ba_vorhanden_ft: sicherheitsCheck.ba_vorhanden_ft,
        gefaehrdungen_bewusst: sicherheitsCheck.gefaehrdungen_bewusst,
        gefaehrdungen_bewusst_ft: sicherheitsCheck.gefaehrdungen_bewusst_ft,
        erstunterweisung: sicherheitsCheck.erstunterweisung,
        erstunterweisung_ft: sicherheitsCheck.erstunterweisung_ft,
        ersthelfer_vor_ort: sicherheitsCheck.ersthelfer_vor_ort,
        ersthelfer_vor_ort_ft: sicherheitsCheck.ersthelfer_vor_ort_ft,
        medizinisch_untersucht: sicherheitsCheck.medizinisch_untersucht,
        medizinisch_untersucht_ft: sicherheitsCheck.medizinisch_untersucht_ft,
        pruefplakette: sicherheitsCheck.pruefplakette,
        pruefplakette_ft: sicherheitsCheck.pruefplakette_ft,
        verbote: sicherheitsCheck.verbote,
        verbote_ft: sicherheitsCheck.verbote_ft,
        ausweise: sicherheitsCheck.ausweise,
        ausweise_ft: sicherheitsCheck.ausweise_ft,
        sicherheitsbekleidung: sicherheitsCheck.sicherheitsbekleidung,
        sicherheitsbekleidung_ft: sicherheitsCheck.sicherheitsbekleidung_ft,
        handschuhe: sicherheitsCheck.handschuhe,
        handschuhe_ft: sicherheitsCheck.handschuhe_ft,
        schutzbrille: sicherheitsCheck.schutzbrille,
        schutzbrille_ft: sicherheitsCheck.schutzbrille_ft,
        schutzmaske: sicherheitsCheck.schutzmaske,
        schutzmaske_ft: sicherheitsCheck.schutzmaske_ft,
        fanggurt: sicherheitsCheck.fanggurt,
        fanggurt_ft: sicherheitsCheck.fanggurt_ft,
        hebebuehne: sicherheitsCheck.hebebuehne,
        hebebuehne_ft: sicherheitsCheck.hebebuehne_ft,
        verbandskasten: sicherheitsCheck.verbandskasten,
        verbandskasten_ft: sicherheitsCheck.verbandskasten_ft,
        erneute_unterweisung: sicherheitsCheck.erneute_unterweisung,
        erneute_unterweisung_ft: sicherheitsCheck.erneute_unterweisung_ft,
        bemerkung: sicherheitsCheck.bemerkung,
        unterschrift_pruefer: sicherheitsCheck.unterschrift_pruefer,
        unterschrift_teamleiter: sicherheitsCheck.unterschrift_teamleiter,
        unterschrift_techniker: sicherheitsCheck.unterschrift_techniker,
      });
    }

  }

  deleteSicherheitsCheck(sicherheitsCheck): void {
    this.dataService.deleteDoc(sicherheitsCheck);
  }

  emitSicherheitsChecks(): void {

    this.zone.run(() => {

      const options = {
        include_docs: true,
        descending: true
      };

      this.dataService.db.query('sicherheitsCheck/by_date_created', options).then((data) => {

        const sicherheitsChecks = data.rows.map(row => {
          return row.doc;
        });

        this.sicherheitsCheckSubject.next(sicherheitsChecks);

      }).catch((err) => {
        console.log(err);
      });

    });

  }

}
