const express = require('express');
const mysql = require('mysql');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const config = require('./config/config.js');

const routes = {};
routes.tickets = require('./routes/tickets.route.js');

const app = express();
const env = config.env;

const options = {};
options.maxAge = (env === 'prod') ? 864000000 : 0;

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use('/api/tickets', routes.tickets);
app.listen(3002);
app.use(express.static(path.join(__dirname, 'public'), options));
app.all('/*', function(req, res) {
	res.sendFile('public/index.html', { root: __dirname });
});