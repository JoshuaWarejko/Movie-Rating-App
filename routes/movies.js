var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');
var Movie = require(rootDir + '/models/movie');

// GET / used to retrieve all movies
router.get('/', function(req, res, next) {
	Movie.find({}).exec(function(err, movies) {
		if(err) return next(err);
		res.json(movies);
	})
});

// POST / used to post a new movie
router.post('/', function(req, res, next) {
	Movie.create(req.body, function(err, movie) {
		if(err) return next(err);
		res.json({success: true, movie: movie});
	});
});

module.exports = router;