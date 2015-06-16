// https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/
// http://www.sitepoint.com/local-authentication-using-passport-node-js/

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    swig = require('swig'),
    cookie_parser = require('cookie-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

/* Setup Swig template engine */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* Setup auth stuff */
app.use(app.router);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        // Auth check
    });
}));

/* Enable static file serving from /static */
app.use('/static', express.static('static'));

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Welcome'
    });
});

app.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

app.post('/login', function(req, res) {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/login'
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});