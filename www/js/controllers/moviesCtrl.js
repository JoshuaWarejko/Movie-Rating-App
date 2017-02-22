angular.module('app.movies_controller', [])

.controller('MoviesController', function($rootScope, $scope, $state, MovieService, OMDBService) {

	$scope.moviesError = null;
	$scope.movies = null;
	$scope.noMovies = null;
	$scope.movie_search = {
		search: ''
	};
	
	$scope.getMovies = function(title) {
		$scope.noMovies = null;
		OMDBService.getMoviesByTitle(title).then(function(response) {
			console.log('The response from OMDB', response);
			$scope.movies = response.data.results;
			if($scope.movies.length == 0) {
				$scope.noMovies = "No movies for search words";
			}
		}, function(error) {
			console.error(error);
		});
	}

});
