import * as nano from 'nano';

const couch: any = nano({
    url: 'http://admin:couchdb@localhost:5984'
});

export const signupHandler = async (userDoc, provider) => {
    // define couchDB variables
    const users = couch.use('users');

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
            adminUserDoc.roles.push('_admin');
            users.insert(adminUserDoc).then(
                result => {
                    // console.log(result);
                },
                err => {
                    console.log(err.message);
                }
            );
        }).catch((err) => {
            console.log(err);
        });
    }

    console.log(privateDB);

    // Replication handler, fetches admins and respective admin dbs and creates master<->master replications
    // fetch admin users
    let adminUsers = [];
    await users.view('userDoc', 'admin_users', {
        'include_docs': true
    }).then((body) => {
        body.rows.forEach((doc) => {
            adminUsers.push(doc.id);
        })
        console.log(adminUsers);
    }).catch((err) => {
        console.log(err);
    });

    // fetch regular users
    let regularUsers = [];
    await users.view('userDoc', 'regular_users', {
        'include_docs': true
    }).then((body) => {
        body.rows.forEach((doc) => {
            regularUsers.push(doc.id);
        })
        console.log(regularUsers);
    }).catch((err) => {
        console.log(err);
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
        console.log('letsGo')
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
}
