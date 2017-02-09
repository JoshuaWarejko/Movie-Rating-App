var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');
var Movie = require(rootDir + '/models/movie');
var MovieTrack = require(rootDir + '/models/movie_track');

// GET / used to retrieve all reviews.
router.get('/', function(req, res, next) {
	MovieTrack.find({}).populate('user').populate('movie').populate('review').exec(function(err, movie_tracks) {
		if(err) return next(err);
		res.json(movie_tracks);
	});
});

// GET / used to retrieve movies tracked for specific user.
router.get('/:userId', function(req, res, next) {
	MovieTrack.find({user: req.params.userId}).populate('user').populate('movie').populate('review').exec(function(err, movie_tracks) {
		if(err) return next(err);
		res.json(movie_tracks);
	});
});

// // POST / used for posting new reviews.
// router.post('/', function(req, res, next) {

// 	if(req.body.text && req.body.rating && req.body.userId && req.body.movieId) {
// 		var date = new Date().toISOString();
// 		User.findById(req.body.userId).exec(function(err1, user) {
// 			if(err1) return next(err1);
// 			var userId = user._id;

// 			Movie.findById(req.body.movieId).exec(function(err2, movie) {
// 				if(err2) return next(err2);
// 				var movieId = movie._id;
// 				var newReview = new Review({
// 					text: req.body.text,
// 					rating: req.body.rating,
// 					date: date,
// 					user: userId,
// 					movie: movieId
// 				});

// 				Review.create(newReview, function(err, review) {
// 					if(err) return next(err);
// 					res.json({ status: 200, review: review });
// 				});

// 			});
// 		});

// 	} else {
// 		return res.status(401).send("All fields required");
// 	}
// });


// GET / used for getting all movies tracked by a user.
router.get('/:userId/movies-tracked', function(req, res, next) {
	MovieTrack.find({ "user": req.params.userId }).populate('movie').exec(function(err, movieTracks) {
		if(err) return next(err);
		res.json(movieTracks);
	})
});

// POST /:userId/track-movie used for posting a tracked movie for a specific user.
router.post('/:userId/track-movie', function(req, res, next) {
	var date = new Date().toISOString();
	if(req.body.date) {
		date = req.body.date;
	}
	if(req.body.movieId) {
		var movieTrackData = new MovieTrack({
			date: date,
			user: req.params.userId,
			movie: req.body.movieId
		});
		MovieTrack.create(movieTrackData, function(err, movieTrack) {
			if(err) return next(err);
			res.json({ status: 200, movieTrack: movieTrack });
			// var today = new Date().toISOString();
			// var eventData = new Event({
			// 	date: today,
			// 	eventObject: req.body.movieId,

			// });
		})
	} else {
		return res.status(401).send("All fields required");
	}
});

module.exports = router;