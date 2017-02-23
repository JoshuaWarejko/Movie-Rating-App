angular.module('app.person_controller', [])

.controller('PersonController', function($rootScope, $scope, $state, $stateParams, MovieService, OMDBService) {

	$scope.personError = null;
	$scope.person = null;
	$scope.dataLoading = false;

	var getPersonInfo = function() {
		$scope.dataLoading = true;
		OMDBService.getPersonById($stateParams.personId).then(function(response) {
			$scope.person = response.data;
			$scope.dataLoading = false;
		}, function(error) {
			console.error("Error loading person information: ", error);
			$scope.personError = error;
		});
	}
	// Call function immediately to get data
	getPersonInfo();

});
