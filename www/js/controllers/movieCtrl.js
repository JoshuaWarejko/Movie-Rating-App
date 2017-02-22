angular.module('app.movie_controller', [])

.controller('MovieController', function($rootScope, $scope, $state, $stateParams, MovieService, OMDBService) {

	$scope.movieError = null;
	$scope.movie = null;

	OMDBService.getMovieById($stateParams.movieId).then(function(response) {
		$scope.movie = response.data;
		OMDBService.getMovieCreditsById($stateParams.movieId).then(function(response) {
			console.log("The credits response: ", response);
			$scope.movie.credits = response.data;
		}, function(error) {
			console.error("Error loading movie credits: ", error);
			$scope.movieError = error;
		});
		OMDBService.getMovieImagesById($stateParams.movieId).then(function(response) {
			console.log("The images response: ", response);
			$scope.movie.images = response.data;
		}, function(error) {
			console.error("Error loading movie images: ", error);
			$scope.movieError = error;
		});
	}, function(error) {
		console.error("Error loading movie information: ", error);
		$scope.movieError = error;
	});

});
