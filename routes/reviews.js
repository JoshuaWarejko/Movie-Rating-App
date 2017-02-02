var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');
var Movie = require(rootDir + '/models/movie');
var Review = require(rootDir + '/models/review');

router.get('/', function(req, res, next) {
	Review.find({}).exec(function(err, reviews) {
		res.json(reviews);
	})
});

module.exports = router;