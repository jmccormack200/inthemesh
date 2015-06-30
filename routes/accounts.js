var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var models = require('../models');

/* User Registration */
router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register'
    });
});

router.post('/register', function(req, res) {
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

/* User Login */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login',
        error: req.flash('error')
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     successFlash: 'Logged In',
                                     failureFlash: true })
);

/* User Logout */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;