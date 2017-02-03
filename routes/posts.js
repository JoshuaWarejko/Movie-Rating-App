var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var Post = require(rootDir + '/models/post');

router.get('/', function(req, res, next) {
	Post.find({}).exec(function(err, posts) {
		if(err) return next(err);
		res.json(posts);
	})
});

module.exports = router;