var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	movie: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie'
	}
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;