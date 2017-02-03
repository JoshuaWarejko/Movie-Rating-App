var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var Event = require(rootDir + '/models/event');

router.get('/', function(req, res, next) {
	Event.find({}).exec(function(err, events) {
		if(err) return next(err);
		res.json(events);
	})
});

module.exports = router;