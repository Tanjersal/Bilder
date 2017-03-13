//entry point

var express = require('express');
var config = require('./server/configure'); //configuration file
var app = express();

app.set('port', process.env.PORT || 8000); //set port 
app.set('views', __dirname + '/views'); //views location

app = config(app); //reference the configure module

app.get('/', function(req, res){

    res.send('Hello Word, NodeJS is fun!');
});

app.listen(app.get('port'), function(){

    console.log('Server is up running at localhost ' + app.get('port'));
});