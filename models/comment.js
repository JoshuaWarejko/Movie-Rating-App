var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	text: { type: String, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	date: { type: Date, required: true }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;