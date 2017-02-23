angular.module('app.movie_controller', [])

.controller('MovieController', function($rootScope, $scope, $state, $stateParams, MovieService, OMDBService) {

	$scope.movieError = null;
	$scope.movie = null;
	$scope.dataLoading = false;

	var getMovieInfo = function() {
		$scope.dataLoading = true;
		OMDBService.getMovieById($stateParams.movieId).then(function(response) {
			$scope.movie = response.data;
			OMDBService.getMovieCreditsById($stateParams.movieId).then(function(response) {
				$scope.movie.credits = response.data;
				$scope.dataLoading = false;
			}, function(error) {
				console.error("Error loading movie credits: ", error);
				$scope.movieError = error;
			});
			OMDBService.getMovieImagesById($stateParams.movieId).then(function(response) {
				$scope.movie.images = response.data;
			}, function(error) {
				console.error("Error loading movie images: ", error);
				$scope.movieError = error;
			});
		}, function(error) {
			console.error("Error loading movie information: ", error);
			$scope.movieError = error;
		});
	}

	// Call the function immediately.
	getMovieInfo();

});
