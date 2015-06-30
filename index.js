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
var accountRoutes = require('./routes/accounts.js');
var adminRoutes = require('./routes/admin.js');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];

/* Setup Swig template engine */
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* Setup auth stuff */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: config.secret,
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* Setup Passport itself */
passport.use(new LocalStrategy(models.User.authenticate()));
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

/* Enable static file serving from /static */
app.use('/static', express.static('static'));
app.use('/user', accountRoutes);
app.use('/admin', adminRoutes);

app.get('/', function(req, res) {
    var p_title = 'Welcome';
    if (req.user) {
        p_title += ', ' + req.user.username;
    }

    res.render('index', {
        title: p_title
    });
});

/* Serve it up hot and fresh */
http.listen(3000, function() {
    console.log('listening on *:3000');
});