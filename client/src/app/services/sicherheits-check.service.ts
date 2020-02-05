import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandardFormService {

  // Define which database to access
  dbname = 'private';
  sicherheitsCheckSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {}

  init(): void {
    this.emitSicherheitsChecks();
    this.dataService.dbs[this.dbname].changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
      if (change.doc.type === 'sicherheitsCheck' || change.deleted) {
        this.emitSicherheitsChecks();
      }
    });
  }

  getSingleSicherheitsCheck(id) {
    return this.dataService.dbs[this.dbname].get(id);
  }

  getSicherheitsChecks(): BehaviorSubject<object[]> {
    return this.sicherheitsCheckSubject;
  }

  saveSicherheitsChecks(sicherheitsCheck) {
    if (sicherheitsCheck.doc) {
      const updatedDoc = sicherheitsCheck.doc;
      updatedDoc.kunde = sicherheitsCheck.kunde;
      updatedDoc.bemerkung = sicherheitsCheck.bemerkung;
      return this.dataService.updateDoc(updatedDoc, this.dbname);
    } else {
      return this.dataService.createDoc({
        kunde: sicherheitsCheck.kunde,
        author: sicherheitsCheck.author,
        dateCreated: sicherheitsCheck.dateCreated,
        dateUpdated: sicherheitsCheck.dateUpdated,
        type: 'sicherheitsCheck',
        bemerkung: sicherheitsCheck.bemerkung,
      }, this.dbname);
    }

  }

  deleteSicherheitsCheck(sicherheitsCheck): void {
    this.dataService.deleteDoc(sicherheitsCheck, this.dbname);
  }

  emitSicherheitsChecks(): void {
    this.zone.run(() => {
      const options = {
        include_docs: true,
        descending: true
      };
      this.dataService.dbs[this.dbname].query('sicherheitsCheck/by_date_created', options).then((data) => {
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
