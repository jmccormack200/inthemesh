var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    swig = require('swig'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('connect-flash');

var models = require('./models');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];

/* Setup Swig template engine */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* Setup auth stuff */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: config.secret, cookie: {maxAge: 60000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* Setup Passport itself */
passport.use(new LocalStrategy(models.User.authenticate()));
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

/* Enable static file serving from /static */
app.use('/static', express.static('static'));

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Welcome',
        user: req.user
    });
});

app.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login',
        error: req.flash('error')
    });
});

app.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register'
    });
});

app.post('/register', function(req, res) {
    models.User.register(new models.User({ username: req.body.username }),
        req.body.password,
        function (err, user) {
            if (err) {
                return res.render('register', {
                    title: 'Register',
                    error: err,
                    user: user
                });
            }

            passport.authenticate('local')(req, res, function() {
                res.redirect('/');
            });
        });
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     successFlash: 'Logged In',
                                     failureFlash: true })
);

http.listen(3000, function() {
    console.log('listening on *:3000');
});