import { sharedDesignDocuments } from '../design-docs/shared-design-docs';
import { privateDesignDocuments } from '../design-docs/private-design-docs';
import { usersDesignDocuments } from '../design-docs/users-design-docs';
import * as nano from 'nano';

const couch: any = nano({
    url: 'http://admin:couchdb@localhost:5984'
});

export const dbSetup = () => {
    console.log('Setting up databases');

    // define couchDB variables
    const resources = couch.use('user-resources');
    const shared = couch.use('shared');
    const users = couch.use('users');

    // check if database structure has been initialized and if not create needed databases & insert docs
    couch.db.get('user-resources', function (err, body) {
        if (err) {
            couch.db.create('user-resources', function (err, data) {
                if (err) {
                    console.log('user-resources: ' + err.reason)
                } else {
                    console.log('user-resources database created');
                    // insert private db design docs
                    for (let doc of privateDesignDocuments) {
                        resources.insert(doc).then(
                            result => {
                                // console.log(result);
                            },
                            err => {
                                console.log(err.message);
                            }
                        );
                    }
                }
            });
            couch.db.get('shared', function (err, body) {
                console.log('shared database created');
                for (let doc of sharedDesignDocuments) {
                    shared.insert(doc).then(
                        result => {
                            // console.log(result);
                        },
                        err => {
                            console.log(err.message);
                        }
                    );
                }
            });
            couch.db.get('users', function (err, body) {
                console.log('users database created');
                for (let doc of usersDesignDocuments) {
                    users.insert(doc).then(
                        result => {
                            // console.log(result);
                        },
                        err => {
                            console.log(err.message);
                        }
                    );
                }
            });
            couch.db.get('_replicator', function (err, body) {
                if (err) {
                    couch.db.create('_replicator', function (err, data) {
                        (err) ? console.log('_replicator: ' + err.reason) : console.log('_replicator database created');
                    });
                }
            });
        }
    });
}
