import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivateDocService {

  // Define which database to access
  dbname = 'private';
  privateDocSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {}

  init(): void {
    this.emitPrivateDocs();
    this.dataService.dbs[this.dbname].changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
      if (change.doc.type === 'standardDoc' || change.deleted) {
        this.emitPrivateDocs();
      }
    });
  }

  getSinglePrivateDoc(id) {
    return this.dataService.dbs[this.dbname].get(id);
  }

  getPrivateDocs(): BehaviorSubject<object[]> {
    return this.privateDocSubject;
  }

  savePrivateDocs(doc) {
    if (doc.doc) {
      const updatedDoc = doc.doc;
      updatedDoc.title = doc.title;
      updatedDoc.note = doc.note;
      return this.dataService.updateDoc(updatedDoc, this.dbname);
    } else {
      return this.dataService.createDoc({
        title: doc.title,
        author: doc.author,
        dateCreated: doc.dateCreated,
        dateUpdated: doc.dateUpdated,
        type: 'standardDoc',
        note: doc.note,
      }, this.dbname);
    }

  }

  deletePrivateDoc(doc): void {
    this.dataService.deleteDoc(doc, this.dbname);
  }

  emitPrivateDocs(): void {
    this.zone.run(() => {
      const options = {
        include_docs: true,
        descending: true
      };
      this.dataService.dbs[this.dbname].query('sicherheitsCheck/by_date_created', options).then((data) => {
        const standardDoc = data.rows.map(row => {
          return row.doc;
        });
        this.privateDocSubject.next(standardDoc);
      }).catch((err) => {
        console.log(err);
      });
    });
  }

}
