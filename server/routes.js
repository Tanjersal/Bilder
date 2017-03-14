//routes 

var express = require('express');
var router = express.Router();

//controllers
var home = require('../controllers/home');
var image = require('../controllers/image');


//controllers function mapping routes
module.exports = function(app) {

    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);

    app.use(router); //initialise routes
};