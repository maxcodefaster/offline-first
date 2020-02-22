import { sharedDesignDocuments } from './design-docs/shared-design-docs';
import { privateDesignDocuments } from './design-docs/private-design-docs';
import { usersDesignDocuments } from './design-docs/users-design-docs';
import * as nano from 'nano';

const couch: any = nano({
    url: 'http://admin:couchdb@localhost:5984'
});

export const dbSetup = async () => {
    // give time for superlogin to set up dbs
    await new Promise(resolve => setTimeout(resolve, 250));

    // Dev option to destroy all databases ! Use with caution ! Delete those lines in production
    // couch.db.list().then((body) => {
    //     body.forEach((db) => {
    //         couch.db.destroy(db).then((body) => {
    //             console.log(db + 'destroyed');
    //         })
    //     });
    // });
    // return;

    // define couchDB variables
    const resources = couch.use('user-resources');
    const shared = couch.use('shared');
    const users = couch.use('users');

    // check if database structure has been initialized and if not create needed databases & insert docs
    couch.db.get('user-resources').then((body) => {
        console.log('Databases all set up');
    }).catch((err) => {
        couch.db.create('user-resources').then((body) => {
            console.log('user-resources database created. Inserting docs..');
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
        }).catch((err) => {
            console.log('user-resources: ' + err.reason)
        });
        couch.db.get('shared').then((body) => {
            console.log('shared database already exists. Inserting docs...');
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
        }).catch((err) => {
            couch.db.create('shared').then((body) => {
                console.log('shared database created. Inserting docs...');
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
            }).catch((err) => {
                console.log(err);
            });
        });
        couch.db.get('users').then((body) => {
            console.log('users database already exists. Inserting docs...');
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
        }).catch((err) => {
            couch.db.create('users').then((body) => {
                console.log('users database created. Inserting docs...');
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
            }).catch((err) => {
                console.log(err);
            });
        });
        couch.db.get('_replicator', function (err, body) {
            couch.db.create('_replicator').then((body) => {
                console.log('_replicator database created');
            }).catch((err) => {
                console.log('_replicator: ' + err.reason)
            });
        });
    });
}
