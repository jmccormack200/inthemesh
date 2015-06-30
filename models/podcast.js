var mongoose = require('mongoose');
var slub = require('slug');

var PodcastSchema = new mongoose.Schema({
    title: String,
    blurb: String,
    description: String,
    final_filename: String,
    raw_filename: String
});

PodcastSchema.post('save', function(doc) {
    this.final_filename = slug(this.title) + '.mp3';
    this.raw_filename = slug(this.title) + '-raw.mp3';
    next();
});

var Podcast = mongoose.model('Podcast', PodcastSchema, 'podcasts');

module.exports = Podcast;