var mongoose = require('mongoose');
var env      = process.env.NODE_ENV || 'development';
var config   = require(__dirname + '/../config/config.json')[env];

var user   = require('./user');

var uri = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database;

var db = mongoose.connection;
mongoose.connect(uri);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(cb) {
    console.log('[db] connected to mongo');
});

module.exports = {
    User: user,
      db: db
};