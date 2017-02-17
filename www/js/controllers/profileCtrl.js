angular.module('app.profile_controller', [])

.controller('ProfileController', function($rootScope, $scope, Auth, ngDialog, MovieTrackService) {

	$scope.trackedMovies = [];

	// Function to open the dialog popup for tracking movies
	$scope.trackMovie = function() {
		ngDialog.open({
			template: '../templates/dialogs/track_movie.html',
			className: 'ngdialog-theme-default track_movie',
			width: 900,
			showClose: true,
			controller: 'TrackMovieController',
			closeByNavigation: true
		});
	}

	// Load the users tracked movies
	$rootScope.$on('reloadTrackedMovies', function() {
		MovieTrackService.getTrackedMovies($rootScope.currentUser.id).then(function(response) {
			console.log("The user's tracked movies!", response);
			$scope.trackedMovies = response.data;
		}, function(error) {
			console.error(error);
		});
	});

	$rootScope.$broadcast('reloadTrackedMovies');

})

.controller('TrackMovieController', function($rootScope, $scope, $timeout, $http, CONFIG, ngDialog, OMDBService) {

	$scope.movie_search = '';
	$scope.search_items = [];
	$scope.chosen = { movie: null };
	$scope.movie_selected = false;
	$scope.tracked = {
		date_watched: $scope.today,
		review_text: '',
		rating: ''
	}
	$scope.trackError = null;

	$scope.getNewResults = function() {
		OMDBService.getMoviesByTitle($scope.movie_search).then(function(response) {
			$scope.search_items = response.data.results;
		}, function(error) {
			console.error(error);
		});
	}

	$scope.selectMovie = function(movie) {
		console.log("Movie selected!");
		$scope.chosen.movie = movie;
		$scope.movie_selected = true;
		$scope.movie_search = '';
		$scope.search_items = [];
	}

	$scope.backToSelect = function() {
		$scope.movie_selected = false;
		$scope.chosen.movie = null;
	}

	$scope.saveMovieTrack = function() {
		$scope.chosen.movie.omdbId = $scope.chosen.movie.id;
		$http.post(CONFIG.url + '/movie-tracks', {
			movie: $scope.chosen.movie,
			tracked: $scope.tracked,
			userId: $rootScope.currentUser.id
		}).then(function(response) {
			console.log("The movie track response: ", response);
			ngDialog.close();
			$rootScope.$broadcast('reloadTrackedMovies');
		}, function(error) {
			console.error(error);
			$scope.trackError = error;
		})
	}

})
;