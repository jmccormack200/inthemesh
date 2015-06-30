/* Administration Section
 * These routes are closed off to the general public
 * and require a superuser account to access.
 */

var express = require('express');
var router = express.Router();

router.get('/model/:model', function(req, res) {
    if (req.user && req.user.superuser === true) {
        res.render('admin', {
            title: 'Admin'
        });
    }

    res.redirect('/');
});

router.get('/', function(req, res) {
    if (req.user && req.user.superuser === true) {
        res.render('admin', {
            title: 'Admin'
        });
    }

    res.redirect('/');
});

module.exports = router;