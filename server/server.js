var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var SuperLogin = require('@wwoods/superlogin');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var config = {
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
            shared: ['gesaqs']
        }
    },
    providers: {
        local: true
    },
};

// Initialize SuperLogin 
var superlogin = new SuperLogin(config);

// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);

app.listen(process.env.PORT || 8080);