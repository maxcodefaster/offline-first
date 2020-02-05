const nano = require('nano')('http://'+process.env.COUCHDB_ADMIN+':'+process.env.COUCHDB_PW+'@'+process.env.COUCHDB_HOST);
const superloginConfig = require('../config/superlogin.config.js');
const SuperLogin = require('@wwoods/superlogin');

// Create superlogin event emitter
module.exports.initSuperLogin = app => {

    // Initialize SuperLogin 
    const superlogin = new SuperLogin(superloginConfig);
    console.log('Superlogin loaded');

    // Mount SuperLogin's routes to our app 
    app.use('/auth', superlogin.router);

    superlogin.on('signup', function(userDoc, provider) {
        console.log(JSON.stringify(userDoc));

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
            console.log(dbs)
            if (regex.test(dbs)) {
                privateDB = dbs;
            }
        }

        // Replicate design documents to private DB
        nano.db.replicate('user-resources', privateDB).then((body) => {
            return nano.db.replication.query(body.id);
        }).then((response) => {
            // console.log(response);
        });

        if (userDoc.isAdmin) {
            // Replicate AdminDB to AdminUsers
            nano.db.replication.enable('admin-database', privateDB, opts).then((body) => {
                return nano.db.replication.query(body.id);
            }).then((response) => {
                // console.log(response);
            });
        } else {
            // Enable replication from userDB to adminDB
            nano.db.replication.enable(privateDB, 'admin-database', opts).then((body) => {
                return nano.db.replication.query(body.id);
            }).then((response) => {
                // console.log(response);
            });
        }
    })
}