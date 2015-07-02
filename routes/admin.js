/* Administration Section
 * These routes are closed off to the general public
 * and require a superuser account to access.
 */

var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/collection/:col/document/:oid', function(req, res) {
    //if (req.user && req.user.superuser === true) {
        /* Find the requested document and send its contents to
         * the client.
         */
        var col = req.params.col,
            oid = req.params.oid;
        var m = models[col];
        m.findById(oid, function(err, doc) {
            if (err) {
                return;
            }

            res.render('admin/document', {
                title: 'Document: ' + oid,
                oid: oid,
                doc: doc,
                model: m
            });
        });
        
    //} else {
    //    res.redirect('/');
    //}
});

router.get('/collection/:col', function(req, res) {
    //if (req.user && req.user.superuser === true) {
        /* Get all documents and send them to the client */
        var col = req.params.col;
        var m = models[col];
        m.find({}, function(err, docs) {
            if (err) {
                return;
            }

            res.render('admin/collection', {
                title: 'Collection: ' + col,
                model: col,
                docs: docs
            });
        });
    //} else {
    //    res.redirect('/');
    //}
});

router.get('/', function(req, res) {
    /* Send a list of models (collections) to the client. */
    if (req.user && req.user.superuser === true) {
        res.render('admin/index', {
            title: 'Index',
            models: models
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;