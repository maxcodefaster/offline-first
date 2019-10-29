import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public db: PouchDB = null;
    private remote: string;

    constructor() {

    }

    initDatabase(remote): void {

        this.db = new PouchDB('gesaqsdb', {
            auto_compaction: true
        });

        this.remote = remote;

        this.initRemoteSync();

    }

    initRemoteSync(): void {

        const options = {
            live: true,
            retry: true
        };

        this.db.sync(this.remote, options);

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
