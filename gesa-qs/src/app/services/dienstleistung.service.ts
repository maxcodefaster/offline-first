import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DienstleistungService {

  dienstleistungSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {

  }

  init(): void {

    this.emitDienstleistung();

    this.dataService.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {

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

      this.dataService.updateDoc(updatedDoc);

    } else {
      this.dataService.createDoc({
        name: dienstleistung.name,
        type: 'dienstleistung',
      });
    }

  }

  deleteDienstleistung(dienstleistung): void {
    this.dataService.deleteDoc(dienstleistung);
  }

  emitDienstleistung(): void {

    this.zone.run(() => {

      const options = {
        include_docs: true,
        descending: false
      };

      this.dataService.db.query('dienstleistung/by_name', options).then((data) => {
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
