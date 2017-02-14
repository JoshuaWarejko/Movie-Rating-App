'use strict';

angular.module('app.services', [])

.service('MovieService', function($http, CONFIG, $q) {
	this.getMovies = function() {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movies').then(function(response) {
				if(response.data.length > 0) {
					return resolve(response);
				} else {
					return reject("No movies yet");
				}
			}, function(error) {
				return reject("Error loading movies");
			});
		});
	};
})

.service('OMDBService', function($http, CONFIG, $q) {
	this.getMoviesByTitle = function(title) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/' + title).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
})

.service('MovieTrackService', function($http, CONFIG, $q) {
	this.getTrackedMovies = function(userId) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-tracks/' + userId).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject({ message: "Error loading tracked movies", error: error});
			});
		});
	}
	this.checkMovieTrackedStatus = function(userId, movieId) {
		return $q(function(resolve, reject) {
			$http.post(CONFIG.url + '/movie-tracks/status', {userId: userId, movieId: movieId}).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject({ message: "No movie or user found to track", error: error});
			});
		});
	}
})

.service('timeService', function($filter, CONFIG) {
	this.getToday = function(){
		return $filter('date')(new Date(), CONFIG.dateFormat);
	}
})

;