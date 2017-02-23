angular.module('app.movies_controller', [])

.controller('MoviesController', function($rootScope, $scope, $state, MovieService, OMDBService) {

	$scope.moviesError = null;
	$scope.movies = null;
	$scope.noMovies = null;
	$scope.dataLoading = false;
	$scope.movie_search = {
		search: ''
	};
	
	$scope.getMovies = function(title) {
		$scope.movies = null;
		$scope.noMovies = null;
		$scope.dataLoading = true;
		OMDBService.getMoviesByTitle(title).then(function(response) {
			$scope.movies = response.data.results;
			if($scope.movies.length == 0) {
				$scope.noMovies = "No movies for search words";
			}
			$scope.dataLoading = false;
		}, function(error) {
			console.error(error);
			$scope.noMovies = error;
		});
	}

});
