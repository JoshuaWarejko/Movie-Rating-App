var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');
var Movie = require(rootDir + '/models/movie');
var Comment = require(rootDir + '/models/comment');

router.get('/', function(req, res, next) {
	Comment.find({}).exec(function(err, comments) {
		if(err) return next(err);
		res.json(comments);
	})
});

module.exports = router;