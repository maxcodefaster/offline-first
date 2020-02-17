import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDocService {
  // Define which database to access
  dbname = 'shared';
  privateDocSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {}

  init(): void {
    this.emitSharedDocs();
    this.dataService.dbs[this.dbname].changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
      if (change.doc.type === 'sharedDoc' || change.deleted) {
        this.emitSharedDocs();
      }
    });
  }

  getSingleSharedDoc(id) {
    return this.dataService.dbs[this.dbname].get(id);
  }

  getSharedDocs(): BehaviorSubject<object[]> {
    return this.privateDocSubject;
  }

  saveSharedDocs(doc) {
    if (doc.doc) {
      const updatedDoc = doc.doc;
      updatedDoc.title = doc.title;
      updatedDoc.note = doc.note;
      updatedDoc.dateUpdated = doc.dateUpdated;
      return this.dataService.updateDoc(updatedDoc, this.dbname);
    } else {
      return this.dataService.createDoc({
        title: doc.title,
        author: doc.author,
        dateCreated: doc.dateCreated,
        dateUpdated: doc.dateUpdated,
        type: 'sharedDoc',
        note: doc.note,
      }, this.dbname);
    }

  }

  deleteSharedDoc(doc): void {
    this.dataService.deleteDoc(doc, this.dbname);
  }

  emitSharedDocs(): void {
    this.zone.run(() => {
      const options = {
        include_docs: true,
        descending: true
      };
      this.dataService.dbs[this.dbname].query('sharedDoc/by_date_created', options).then((data) => {
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
