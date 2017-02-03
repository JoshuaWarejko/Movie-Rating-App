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

.service('timeService', function($filter, CONFIG) {
	this.getToday = function(){
		return $filter('date')(new Date(), CONFIG.dateFormat);
	}
})

;