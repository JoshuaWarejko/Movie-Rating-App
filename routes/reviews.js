var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');
var Movie = require(rootDir + '/models/movie');
var Review = require(rootDir + '/models/review');

// GET / used to retrieve all reviews.
router.get('/', function(req, res, next) {
	Review.find({}).populate('user').populate('movie').exec(function(err, reviews) {
		if(err) return next(err);
		res.json(reviews);
	});
});

// GET / used to retrieve reviews for specific user.
router.get('/:userId', function(req, res, next) {
	Review.find({user: req.params.userId}).populate('user').populate('movie').exec(function(err, reviews) {
		if(err) return next(err);
		res.json(reviews);
	});
});

// POST / used for posting new reviews.
router.post('/', function(req, res, next) {

	if(req.body.text && req.body.rating && req.body.userId && req.body.movieId) {
		var date = new Date().toISOString();
		User.findById(req.body.userId).exec(function(err1, user) {
			if(err1) return next(err1);
			var userId = user._id;

			Movie.findById(req.body.movieId).exec(function(err2, movie) {
				if(err2) return next(err2);
				var movieId = movie._id;
				var newReview = new Review({
					text: req.body.text,
					rating: req.body.rating,
					date: date,
					user: userId,
					movie: movieId
				});

				Review.create(newReview, function(err, review) {
					if(err) return next(err);
					res.json({ status: 200, review: review });
				});

			});
		});

	} else {
		return res.status(401).send("All fields required");
	}
});

module.exports = router;