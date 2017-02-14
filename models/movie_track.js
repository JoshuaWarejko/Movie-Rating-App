var mongoose = require('mongoose');

var MovieTrackSchema = new mongoose.Schema({
	createdDate: { type: Date, required: true },
	updatedDate: { type: Date, required: true },
	dateWatched: { type: Date },
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
	}],
	rewatch: { type: Boolean, required: true }
});

var MovieTrack = mongoose.model('MovieTrack', MovieTrackSchema);
module.exports = MovieTrack;