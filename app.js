var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var index = require('./routes/index');
var eventos = require('./routes/eventos');
var users = require('./routes/users');

var app = express();

/**
 * Starting Cors Middleware
 */
app.use(cors());

/**
 * Logger
 */
var logger = require('./logger');
app.use(logger);

/**
 * Defining Sessions
 */
app.use(session({ 
    secret: 'some-secret',
    saveUninitialized: false,
    resave: true
}));
/**
 * View Engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/**
 * Set Static Folder
 */
app.use(express.static(path.join(__dirname, 'client')));

/**
 * Body Parser Middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Url
 */
app.use('/', index);
app.use('/api/eventos', eventos);
app.use('/api/users', users);

module.exports = app;