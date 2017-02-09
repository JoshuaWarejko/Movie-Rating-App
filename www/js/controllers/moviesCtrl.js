angular.module('app.movies_controllers', [])

.controller('MoviesController', function($rootScope, $scope, $state, MovieService, OMDBService) {

	$scope.moviesError = null;
	$scope.movies = null;
	$scope.movie_search = {
		search: ''
	};
	
	$scope.getMovies = function(title) {
		OMDBService.getMoviesByTitle(title).then(function(response) {
			console.log('The response from OMDB', response);
			$scope.movies = response.data.results;
		}, function(error) {
			console.error(error);
		});
	}

});
