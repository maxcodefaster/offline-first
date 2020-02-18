import { sharedDesignDocuments } from '../design-docs/shared-design-docs';
import { privateDesignDocuments } from '../design-docs/private-design-docs';
import { usersDesignDocuments } from '../design-docs/users-design-docs';
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


    // get just signed up users private DB name
    const regex = /^private\$(.+)$/;
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

    // add _admin role to admin user doc
    if (userDoc.role === 'admin') {
        let adminUserDoc;
        users.get(privateDB.match(regex)[1]).then((body) => {
            adminUserDoc = body;
        });
        console.log(adminUserDoc);
        adminUserDoc.roles.push('_admin');
        users.insert(adminUserDoc).then(
            result => {
                // console.log(result);
            },
            err => {
                console.log(err.message);
            }
        );
    }

    // Replication handler, fetches admins and respective admin dbs and creates master<->master replications
    // fetch admin users
    let adminUsers = [];
    users.view('userDoc', 'admin_users', {
        'include_docs': true
    }).then((body) => {
        body.rows.forEach((doc) => {
            console.log(doc)
            adminUsers.push(doc._id);
        })
    });

    // fetch regular users
    let regularUsers = [];
    users.view('userDoc', 'admin_users', {
        'include_docs': true
    }).then((body) => {
        body.rows.forEach((doc) => {
            console.log(doc)
            regularUsers.push(doc._id);
        })
    });

    // handle replications

    // opts for user to admin db replication
    const optsUserToAdminRep = {
        continuous: true,
        create_target: true,
        // exclude design documents
        selector: {
            "_id": {
                "$regex": "^(?!_design\/)",
            }
        }
    };

    if (userDoc.role === 'admin') {
        regularUsers.forEach((user) => {
            // opts for admin to replication
            const optsAdminToUserRep = {
                continuous: true,
                // only include relevant user documents & exclude design documents
                selector: {
                    "_id": {
                        "$regex": "^(?!_design\/)",
                    },
                    "author": {
                        "$eq": user,
                    }
                }
            };
            // enable replication from private DB to admin privateDB
            couch.db.replication.enable('private$' + user, privateDB, optsUserToAdminRep).then((body) => {
                return couch.db.replication.query(body.id);
            }).then((response) => {
                // console.log(response);
            }).catch((err) => {
                console.log(err);
            });
            // enable replication from private DB to admin privateDB
            couch.db.replication.enable(privateDB, 'private$' + user, optsAdminToUserRep).then((body) => {
                return couch.db.replication.query(body.id);
            }).then((response) => {
                // console.log(response);
            }).catch((err) => {
                console.log(err);
            });
        })
    } else { // if user is not admin
        adminUsers.forEach((admin) => {
            // opts for admin to replication
            const optsAdminToUserRep = {
                continuous: true,
                // only include relevant user documents & exclude design documents
                selector: {
                    "_id": {
                        "$regex": "^(?!_design\/)",
                    },
                    "author": {
                        "$eq": privateDB.match(regex)[1],
                    }
                }
            };
            // enable replication from private DB to admin privateDB
            couch.db.replication.enable(privateDB, 'private$' + admin, optsUserToAdminRep).then((body) => {
                return couch.db.replication.query(body.id);
            }).then((response) => {
                // console.log(response);
            }).catch((err) => {
                console.log(err);
            });
            // enable replication from private DB to admin privateDB
            couch.db.replication.enable(privateDB, 'private$' + admin, optsAdminToUserRep).then((body) => {
                return couch.db.replication.query(body.id);
            }).then((response) => {
                // console.log(response);
            }).catch((err) => {
                console.log(err);
            });
        })
    }

    // couch.db.list().then((body) => {
    //     body.forEach((db) => {
    //         let matchResult = db.match(regex);
    //         if (matchResult && db !== privateDB) {
    //             let userName = matchResult[1];
    //             // opts for admin to replication
    //             const optsAdminToUserRep = {
    //                 continuous: true,
    //                 // only include relevant user documents & exclude design documents
    //                 selector: {
    //                     "_id": {
    //                         "$regex": "^(?!_design\/)",
    //                     },
    //                     "author": {
    //                         "$eq": userName,
    //                     }
    //                 }
    //             };
    //             // enable replication from private DB to admin privateDB
    //             couch.db.replication.enable(db, privateDB, optsUserToAdminRep).then((body) => {
    //                 return couch.db.replication.query(body.id);
    //             }).then((response) => {
    //                 // console.log(response);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //             // enable replication from private DB to admin privateDB
    //             couch.db.replication.enable(privateDB, db, optsAdminToUserRep).then((body) => {
    //                 return couch.db.replication.query(body.id);
    //             }).then((response) => {
    //                 // console.log(response);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }
    //     });
    // })
}
