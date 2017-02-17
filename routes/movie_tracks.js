var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var User = require(rootDir + '/models/user');
var Movie = require(rootDir + '/models/movie');
var MovieTrack = require(rootDir + '/models/movie_track');

// GET / used to retrieve all reviews.
router.get('/', function(req, res, next) {
	MovieTrack.find({}).populate('user', '-password').populate('movie').populate('comments').exec(function(err, movie_tracks) {
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
			var movieTrackData = {
				createdDate: date,
				updatedDate: date,
				dateWatched: req.body.tracked.date_watched,
				user: req.body.userId,
				movie: null,
				review: {
					text: req.body.tracked.review_text,
					rating: parseInt(req.body.tracked.rating)
				},
				rewatch: false
			}
			// Check if movie object already exists in our database
			Movie.findOne({omdbId: req.body.movie.id}, function(err, existingMovie) {
				if(existingMovie) {
					console.log("Movie already exists. Creating Movie Track!");
					movieTrackData.movie = existingMovie._id;
					// Check if user has already tracked this movie
					MovieTrack.find({movie: existingMovie._id, user: req.body.userId}).exec(function(err, movie_track) {
						if(err) return next(err);
						if(movie_track && movie_track.length > 0) {
							console.log("The movie track response: ", movie_track);
							console.log("Movie already tracked by user, marking as rewatch!");
							movieTrackData.rewatch = true;
							var movieTrack = new MovieTrack(movieTrackData);
							MovieTrack.create(movieTrack, function(err, movieTrack) {
								if(err) return next(err);
								res.json({success: true, movieTrack: movieTrack});
							});
						} else {
							console.log("Movie has never been tracked! Creating new instance...");
							var movieTrack = new MovieTrack(movieTrackData);
							MovieTrack.create(movieTrack, function(err, movieTrack) {
								if(err) return next(err);
								res.json({success: true, movieTrack: movieTrack});
							});
						}
					});
				} else {
					Movie.create(req.body.movie, function(err, movie) {
						console.log("Movie doesn't exist. Creating new movie instance...");
						if(err) return next(err);
						movieTrackData.movie = movie._id;
						var movieTrack = new MovieTrack(movieTrackData);
						MovieTrack.create(movieTrack, function(err, movieTrack) {
							if(err) return next(err);
							console.log("New moview track created!");
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


module.exports = router;