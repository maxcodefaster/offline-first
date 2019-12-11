import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public db: PouchDB = null;
    private remote: string;

    constructor(
        private userService: UserService,
    ) {

    }

    initDatabase(remote): void {


        this.db = new PouchDB('gesaqsdb', {
            auto_compaction: true
        });

        this.remote = remote.userDBs.gesaqs;

        this.initRemoteSync();

    }

    initRemoteSync(): void {

        const options = {
            live: true,
            retry: true,
            filter: 'app/after_author',
        };

        this.db.sync(this.remote, options, ).on('change', result => {
            console.log(result);
        });

    }

    createDoc(doc): Promise<any> {
        return this.db.post(doc);
    }

    updateDoc(doc): Promise<any> {
        return this.db.put(doc);
    }

    deleteDoc(doc): Promise<any> {
        return this.db.remove(doc);
    }

}
