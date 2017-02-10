var express = require('express');
var router = express.Router();
var rootDir = require('app-root-path').path;
var request = require('request');
var apiKey = '9fa4512996f9fd2fa0e544c9efc75fa6';

router.get('/', function(req, res, next) {
	var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=&page=1&include_adult=false";
	request({
		method: "GET",
		uri: url,
		headers: {
			"Content-Type": "application/json"
		}
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(JSON.parse(body));
		} else {
			console.log(response);
		}
	}).on('error', function(err) {
		console.log(err);
		res.json(JSON.parse(err));
	});

});

// GET / Search OMDB for movie by name
router.get('/:movieName', function(req, res, next) {
	var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + req.params.movieName + "&page=1&include_adult=false";
	request({
		method: "GET",
		uri: url,
		headers: {
			"Content-Type": "application/json"
		}
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(JSON.parse(body));
		} else {
			console.log(response);
		}
	}).on('error', function(err) {
		console.log(err);
		res.json(JSON.parse(err));
	});

});

module.exports = router;