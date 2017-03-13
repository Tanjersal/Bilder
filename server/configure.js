
var path = require('path');
var express = require('express');
var routes = require('./routes'); //routes for GET, POST...requests
var exphbs = require('express-handlebars'); //templating engine
var bodyParser = require('body-parser'); //form submission request are accessible with req.body
var cookieParser = require('cookie-parser'); //cookies to be send and received
var morgan = require('morgan'); //module for logging - used in debugging
var methodOverride = require('method-override'); //for older browser to fake REST verbs
var errorhandler = require('errorhandler'); //handles error through the middleware
var moment = require('moment'); //npm module to handle dates formating
//exports

module.exports = function(app){

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended': true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value'));

    routes(app); //moving the routes to route folder

    app.use('/public/', express.static(path.join(__dirname, '../public'))); //or app.use(express.static(__dirname + '/public'));

    if('development' === app.get('env')){
        app.use(errorhandler);
    }

    routes(app); //activate the routes

}