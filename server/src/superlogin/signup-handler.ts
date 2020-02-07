import { sharedDesignDocuments } from './shared-design-docs';
import { privateDesignDocuments } from './private-design-docs';
import * as nano from 'nano';

const couch: any = nano({
    url: 'http://admin:couchdb@localhost:5984'
});

export const signupHandler = (userDoc, provider) => {
    //Dev option to destroy all databases ! Use with caution ! Delete those lines in production
    // couch.db.list().then((body) => {
    //     body.forEach((db) => {
    //         couch.db.destroy(db).then((body) => {
    //             console.log(db + 'destroyed');
    //         })
    //     });
    // });
    // return;

    // check if database structure has been initialized and if not create needed databases & insert docs
    couch.db.get('user-resources', function (err, body) {
        if (err) {
            couch.db.create('user-resources', function (err, data) {
                if (err) {
                    console.log('user-resources: ' + err.reason)
                } else {
                    console.log('user-resources database created');
                    const resources = couch.use('user-resources');
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
                const shared = couch.use('shared');
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
            couch.db.get('admin-database', function (err, body) {
                if (err) {
                    couch.db.create('admin-database', function (err, data) {
                        (err) ? console.log('admin-database: ' + err.reason) : console.log('admin database created');
                    });
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

    // opts for replication
    const opts = {
        continuous: true,
        create_target: true,
        // exclude design documents
        selector: {
            "_id": {
                "$regex": "^(?!_design\/)",
            }
        }
    };

    // get private DB name
    const regex = /^private\$.+$/;
    let privateDB;
    for (let dbs in userDoc.personalDBs) {
        if (regex.test(dbs)) {
            privateDB = dbs;
        }
    }

    // Replicate design documents to private DB
    couch.db.replicate('user-resources', privateDB).then((body) => {
        return couch.db.replication.query(body.id);
    }).then((response) => {
        // console.log(response);
    }).catch((err) => {
        console.log(err);
    });

    if (userDoc.isAdmin) {
        // Replicate AdminDB to AdminUsers
        couch.db.replication.enable('admin-database', privateDB, opts).then((body) => {
            return couch.db.replication.query(body.id);
        }).then((response) => {
            // console.log(response);
        }).catch((err) => {
            console.log(err);
        });;
    } else {
        // Enable replication from userDB to adminDB
        couch.db.replication.enable(privateDB, 'admin-database', opts).then((body) => {
            return couch.db.replication.query(body.id);
        }).then((response) => {
            // console.log(response);
        }).catch((err) => {
            console.log(err);
        });;
    }

}
