var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	eventObject: {},
	comments: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Comment'
	}]
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;