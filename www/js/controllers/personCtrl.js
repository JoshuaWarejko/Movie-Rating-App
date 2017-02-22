angular.module('app.person_controller', [])

.controller('PersonController', function($rootScope, $scope, $state, $stateParams, MovieService, OMDBService) {

	$scope.personError = null;
	$scope.person = null;

	OMDBService.getPersonById($stateParams.personId).then(function(response) {
		console.log("The person response: ", response);
		$scope.person = response.data;
	}, function(error) {
		console.error("Error loading person information: ", error);
		$scope.personError = error;
	});

});
