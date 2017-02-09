var mongoose = require('mongoose');

var MovieTrackSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	movie: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie',
		required: true
	},
	review: {
		text: { type: String },
		rating: { type: Number, min: 1, max: 5 }
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

var MovieTrack = mongoose.model('MovieTrack', MovieTrackSchema);
module.exports = MovieTrack;