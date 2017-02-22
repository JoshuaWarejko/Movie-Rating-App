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

// Used for querying THe Online Movie Database
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
	this.getMovieById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/by-id/' + id).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getMovieCreditsById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/' + id + "/credits").then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getMovieImagesById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/' + id + "/images").then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getPersonById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/person/' + id).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
})

// Used for handling movies within the local database
.service('MovieTrackService', function($http, CONFIG, $q) {
	this.getAllTracked = function() {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-tracks/').then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject({ message: "Error loading tracked movies", error: error});
			});
		});
	}
	this.getTrackedMovies = function(userId) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-tracks/' + userId).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject({ message: "Error loading tracked movies", error: error});
			});
		});
	}
})

// User for returning time based things
.service('timeService', function($filter, CONFIG) {
	this.getToday = function(){
		return $filter('date')(new Date(), CONFIG.dateFormat);
	}
})

;