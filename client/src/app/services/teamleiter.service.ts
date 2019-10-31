import { Injectable, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamleiterService {

  teamleiterSubject: BehaviorSubject<object[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService, private zone: NgZone) {

  }

  init(): void {

    this.emitTeamleiter();

    this.dataService.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {

      if (change.doc.type === 'teamleiter' || change.deleted) {
        this.emitTeamleiter();
      }

    });

  }

  getTeamleiter(): BehaviorSubject<object[]> {
    return this.teamleiterSubject;
  }

  saveTeamleiter(teamleiter) {

    if (teamleiter.doc) {

      const updatedDoc = teamleiter.doc;

      updatedDoc.name = teamleiter.name;

      this.dataService.updateDoc(updatedDoc);

    } else {
      this.dataService.createDoc({
        name: teamleiter.name,
        type: 'teamleiter',
      });
    }

  }

  deleteTeamleiter(teamleiter): void {
    this.dataService.deleteDoc(teamleiter);
  }

  emitTeamleiter(): void {

    this.zone.run(() => {

      const options = {
        include_docs: true,
        descending: false
      };

      this.dataService.db.query('teamleiter/by_name', options).then((data) => {
        const teamleiter = data.rows.map(row => {
          return row.doc;
        });

        this.teamleiterSubject.next(teamleiter);

      }).catch((err) => {
        console.log(err);
      });

    });

  }

}
