'use strict';

angular.module('app.homeController', [])

.controller('HomepageController', function($rootScope, $scope, $state, $filter, $window, MovieTrackService, OMDBService) {

	$scope.popularMovies = [];
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;
	var popularSlides = $scope.popularSlides = [];
	var popularSlideIndex = 0;
  
	// Get popular movies
  OMDBService.getPopularMovies().then(function(response) {
  	var popularMovies = $scope.popularMovies = response.data.results;
  	for(var i = 0; i < 5; i++) {
  		$scope.popularSlides.push({
  			image: 'https://image.tmdb.org/t/p/w1920' + popularMovies[i].backdrop_path,
  			title: popularMovies[i].title,
  			id: popularSlideIndex++
  		});
  	}
  }, function(error) {
  	console.error(error);
  });

})
;