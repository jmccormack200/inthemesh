var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    superuser: Boolean
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.pre('save', function(next) {
	this.superuser = false;
	next();
});

var User = mongoose.model('User', UserSchema, 'users');

module.exports = User;