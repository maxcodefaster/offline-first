import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DienstleistungService {

  dbname = 'gesaqs';
  dienstleistungSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {

  }

  init(): void {

    this.emitDienstleistung();

    this.dataService.dbs[this.dbname].changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {

      if (change.doc.type === 'dienstleistung' || change.deleted) {
        this.emitDienstleistung();
      }

    });

  }

  getDienstleistung(): BehaviorSubject<object[]> {
    return this.dienstleistungSubject;
  }

  saveDienstleistung(dienstleistung) {

    if (dienstleistung.doc) {

      const updatedDoc = dienstleistung.doc;

      updatedDoc.name = dienstleistung.name;

      this.dataService.updateDoc(updatedDoc, this.dbname);

    } else {
      this.dataService.createDoc({
        name: dienstleistung.name,
        type: 'dienstleistung',
      }, this.dbname);
    }

  }

  deleteDienstleistung(dienstleistung): void {
    this.dataService.deleteDoc(dienstleistung, this.dbname);
  }

  emitDienstleistung(): void {

    this.zone.run(() => {

      const options = {
        include_docs: true,
        descending: false
      };

      this.dataService.dbs[this.dbname].query('dienstleistung/by_name', options).then((data) => {
        const dienstleistung = data.rows.map(row => {
          return row.doc;
        });

        this.dienstleistungSubject.next(dienstleistung);

      }).catch((err) => {
        console.log(err);
      });

    });

  }

}
