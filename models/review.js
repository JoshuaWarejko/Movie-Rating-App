var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	text: { type: String, required: true },
	rating: { type: Number, min: 1, max: 5, required: true },
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' ,
		required: true
	},
	movie: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Movie',
		required: true
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Comment',
		required: true
	}]
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;