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
	MovieTrack.find({user: req.params.userId}).populate('movie').populate('comments').exec(function(err, movie_tracks) {
		if(err) return next(err);
		res.json(movie_tracks);
	});
});

// POST / used for posting new movies tracked.
router.post('/', function(req, res, next) {

	if(req.body.movie && req.body.tracked) {
		if(req.body.userId) {
			var date = new Date().toISOString();
			Movie.findOne({omdbId: req.body.movie.id}, function(err, existingMovie) {
				if(existingMovie) {
					console.log("Movie already exists. Creating Movie Track!");
					var movieTrack = new MovieTrack({
						createdDate: date,
						updatedDate: date,
						dateWatched: req.body.tracked.date_watched,
						user: req.body.userId,
						movie: existingMovie._id
					});
					MovieTrack.create(movieTrack, function(err, movieTrack) {
						if(err) return next(err);
						res.json({success: true, movieTrack: movieTrack});
					});
				} else {
					Movie.create(req.body.movie, function(err, movie) {
						if(err) return next(err);
						var movieTrack = new MovieTrack({
							createdDate: date,
							updatedDate: date,
							dateWatched: req.body.tracked.date_watched,
							user: req.body.userId,
							movie: movie._id,
							review: {
								text: req.body.tracked.review_text,
								rating: parseInt(req.body.tracked.rating)
							}
						});
						MovieTrack.create(movieTrack, function(err, movieTrack) {
							if(err) return next(err);
							res.json({success: true, movieTrack: movieTrack});
						});
					});
				}
			});
		} else {
			return res.status(401).send("No user to track movie for found");
		}
	} else {
		return res.status(401).send("All fields required");
	}
});


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