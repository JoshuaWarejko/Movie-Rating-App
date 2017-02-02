var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	title: { type: String, required: true },
	directors: [{ type: String }],
	writers: [{ type: String }],
	stars: [{ type: String }],
	releaseDate: { type: Date }
});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;