angular.module('app.feed_controller', [])

.controller('FeedController', function($rootScope, $scope, $state, $filter, $window, MovieTrackService, OMDBService) {

	$scope.trackedMovies = [];
	$scope.popularMovies = [];

	MovieTrackService.getAllTracked().then(function(response) {
		var tracked = $scope.trackedMovies = response.data;
		if(tracked.length == 0) {
			$scope.noTrackedMessage = "No movies have been tracked yet!";
		}
		for(var i = 0; i < tracked.length; i++) {
			var dateArray = new Date(tracked[i].updatedDate).toLocaleTimeString().split(':');
			var ampm = new Date(tracked[i].updatedDate).toLocaleTimeString().split(' ')[1];
			$scope.trackedMovies[i].time = dateArray[0].toString() + ':' + dateArray[1].toString() + ' ' + ampm;
		}
	}, function(error) {
		console.error(error);
	});

});