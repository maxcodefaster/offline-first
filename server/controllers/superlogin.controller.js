const nano = require('nano')('http://admin:couchdb@localhost:5984');
const superloginConfig = require('../config/superlogin.config.js');
const SuperLogin = require('@wwoods/superlogin');

// Create superlogin event emitter
module.exports.initSuperLogin = app => {

    // Initialize SuperLogin 
    const superlogin = new SuperLogin(superloginConfig);

    // Mount SuperLogin's routes to our app 
    app.use('/auth', superlogin.router);

    superlogin.on('signup', function(userDoc, provider) {
        console.log(JSON.stringify(userDoc));
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
        const regex = /^private\$.+$/;
        let privateDB;
        for (let dbs in userDoc.personalDBs) {
            console.log(dbs)
            if (regex.test(dbs)) {
                privateDB = dbs;
            }
        }
        // Enable replication from userDB to adminDB
        nano.db.replication.enable(privateDB, 'admin-database', opts).then((body) => {
            return nano.db.replication.query(body.id);
        }).then((response) => {
            // console.log(response);
        });

        // Replicate design documents to private DB
        nano.db.replicate('gesa-user-resources', privateDB).then((body) => {
            return nano.db.replication.query(body.id);
        }).then((response) => {
            // console.log(response);
        });
    })
}