angular.module('app.movies_controllers', [])

.controller('MoviesController', function($rootScope, $scope, $state, MovieService) {

	$scope.moviesError = null;
	$scope.movies = null;

	MovieService.getMovies().then(function(response) {
		$scope.moviesError = null;
		$scope.movies = response.data;
	}, function(error) {
		console.error(error);
		$scope.moviesError = error.data;
	});

});
