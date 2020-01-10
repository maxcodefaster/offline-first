const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const superloginController = require('./controllers/superlogin.controller.js');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

superloginController.initSuperLogin(app);

app.listen(process.env.PORT || 8080);