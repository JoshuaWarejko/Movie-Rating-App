var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');
var Movie = require(rootDir + '/models/movie');

router.get('/', function(req, res, next) {
	Movie.find({}).exec(function(err, movies) {
		res.json(movies);
	})
});

module.exports = router;