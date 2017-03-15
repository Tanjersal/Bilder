//dependencies

var path = require('path');
var express = require('express');
var routes = require('./routes'); //routes for GET, POST...requests
var exphbs = require('express-handlebars'); //templating engine
var bodyParser = require('body-parser'); //form submission request are accessible with req.body
var cookieParser = require('cookie-parser'); //cookies to be send and received
var morgan = require('morgan'); //module for logging - used in debugging
var methodOverride = require('method-override'); //for older browser to fake REST verbs
var errorHandler = require('errorhandler'); //handles error through the middleware
var moment = require('moment'); //npm module to handle dates formating

module.exports = function(app) {

    app.use(morgan('dev'));
    app.use(bodyParser({uploadDir:path.join(__dirname, 'public/upload/temp')}));

    app.use(methodOverride());
    app.use(cookieParser('IciCestParis'));
    
    routes(app); //moving the routes to route folder

    app.use('/public/', express.static(path.join(__dirname,'../public')));

    if ('development' === app.get('env')) {
    
      app.use(errorHandler());
    }

    //register the rendering engine as handlebars
    app.engine('handlebars', exphbs.create({

        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: app.get('views') + '/partials',

        //hbs helper
        helpers: {
            timeago: function(timeStamp){

                return moment(timeStamp).startOf('minute').toNow(); //custom time using moment.js
            }
        }

    }).engine);

    //set the view engine
    app.set('view engine', 'handlebars');

    return app; //return the app
};