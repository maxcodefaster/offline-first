const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const SuperLogin = require('@wwoods/superlogin');

const superloginController = require('./controllers/superlogin.controller.js');
const superloginConfig = require('./config/superlogin.config.js');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Initialize SuperLogin 
const superlogin = new SuperLogin(superloginConfig);


// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);

app.listen(process.env.PORT || 8080);

superloginController(superlogin);