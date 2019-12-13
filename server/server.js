const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const SuperLogin = require('@wwoods/superlogin');
const nano = require('nano')('http://localhost:5984');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const config = {
    dbServer: {
        protocol: 'http://',
        host: '127.0.0.1:5984',
        //user: 'admin',
        //password: 'password',
        userDB: 'gesaqs-users',
        couchAuthDB: '_users'
    },
    security: {
        maxFailedLogins: 5,
        lockoutTime: 600,
        tokenLife: 604800, // one week
        loginOnRegistration: true
    },
    mailer: {
        fromEmail: 'gmail.user@gmail.com',
        options: {
            service: 'Gmail',
            auth: {
                user: 'gmail.user@gmail.com',
                pass: 'userpass'
            }
        }
    },
    userDBs: {
        defaultDBs: {
            shared: ['gesaqs'],
            private: ['private']
        }
    },
    providers: {
        local: true
    },
};

// Initialize SuperLogin 
const superlogin = new SuperLogin(config);

// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);

app.listen(process.env.PORT || 8080);

// Create superlogin event emitter
superlogin.on('signup', function(userDoc, provider) {
    const opts = {
        continuous: true,
        create_target: true,
    };
    // console.log(userDoc);
    const regex = /^private\$.+$/;
    let privateDB;
    for (let dbs in userDoc.personalDBs) {
        console.log(dbs)
        if (regex.test(dbs)) {
            privateDB = dbs;
        }
    }
    console.log(privateDB);
    nano.db.replication.enable(privateDB, 'admin-database', opts).then((body) => {
        return nano.db.replication.query(body.id);
    }).then((response) => {
        // console.log(response);
    });
});