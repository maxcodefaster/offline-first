import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public dbs = null;
    private remoteAddress = [];
    private remoteName = [];

    constructor(
        private userService: UserService,
    ) {

    }

    initDatabase(remote): void {
        this.remoteAddress = Object.values(remote.userDBs);
        this.remoteName = Object.keys(remote.userDBs);
        this.dbs = {};

        // save PouchDB instances and address
        for (let i = 0; i < this.remoteName.length; i++) {
            this.dbs[this.remoteName[i]] =
                new PouchDB(this.remoteName[i], {
                    auto_compaction: true
                });
            this.dbs[this.remoteName[i]].address = this.remoteAddress[i];
        }

        console.log(this.dbs);
        this.initRemoteSync();
    }

    initRemoteSync(): void {
        const options = {
            live: true,
            retry: true,
            // filter: 'app/after_author',
        };

        // tslint:disable-next-line: forin
        for (const db in this.dbs) {
            const dbRemote = this.dbs[db].address;

            this.dbs[db].sync(dbRemote, options).on('change', info => {
                console.log(info);
            }).on('active', () => {
                console.log('resume');
            }).on('denied', err => {
                console.log('denied ' + err);
            }).on('complete', info => {
                console.log('complete ' + info);
            }).on('error', err => {
                console.log('error ' + err);
            });
        }
    }

    createDoc(doc, dbname): Promise<any> {
        return this.dbs[dbname].post(doc);
    }

    updateDoc(doc, dbname): Promise<any> {
        return this.dbs[dbname].put(doc);
    }

    deleteDoc(doc, dbname): Promise<any> {
        return this.dbs[dbname].remove(doc);
    }

}
