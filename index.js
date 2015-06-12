// https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    swig = require('swig'),
    cookie_parser = require('cookie-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

/* Setup Swig template engine */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* Enable static file serving from /static */
app.use('/static', express.static('static'));

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Welcome'
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});