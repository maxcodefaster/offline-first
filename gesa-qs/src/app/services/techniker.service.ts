import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnikerService {

  technikerSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {

  }

  init(): void {

    this.emitTechniker();

    this.dataService.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {

      if (change.doc.type === 'techniker' || change.deleted) {
        this.emitTechniker();
      }

    });

  }

  getTechniker(): BehaviorSubject<object[]> {
    return this.technikerSubject;
  }

  saveTechniker(techniker) {

    if (techniker.doc) {

      const updatedDoc = techniker.doc;

      updatedDoc.name = techniker.name;

      this.dataService.updateDoc(updatedDoc);

    } else {
      this.dataService.createDoc({
        name: techniker.name,
        type: 'techniker',
      });
    }

  }

  deleteTechniker(techniker): void {
    this.dataService.deleteDoc(techniker);
  }

  emitTechniker(): void {

    this.zone.run(() => {

      const options = {
        include_docs: true,
        descending: false
      };

      this.dataService.db.query('techniker/by_name', options).then((data) => {
        const techniker = data.rows.map(row => {
          return row.doc;
        });

        this.technikerSubject.next(techniker);

      }).catch((err) => {
        console.log(err);
      });

    });

  }

}
