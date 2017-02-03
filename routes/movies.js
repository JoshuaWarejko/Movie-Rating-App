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

	if(req.body.title) {
		var newMovie = new Movie({
			title: req.body.title,
			directors: req.body.directors,
			writers: req.body.writers,
			stars: req.body.stars,
			releaseDate: req.body.releaseDate
		});

		Movie.create(newMovie, function(err, movie) {
			if(err) return next(err);
			res.json({success: true, movie: movie});
		})
	} else {
		return res.status(401).send("Title is required");
	}

});

module.exports = router;