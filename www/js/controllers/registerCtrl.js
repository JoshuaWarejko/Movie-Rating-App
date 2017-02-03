angular.module('app.register_controller', [])

.controller('RegisterController', function($rootScope, $scope, $state, Auth) {

	$scope.form = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	$scope.registerError = null;

	$scope.signup = function() {
		$scope.registerError = null;
		console.log("Register function hit!");
		Auth.register($scope.form).then(function(response) {
			console.log("The register response: ", response);
			$rootScope.currentUser = response.data;
			$state.go('index.profile');
		}, function(error) {
			console.error("Error while registering: ", error);
			$scope.registerError = error.data;
		});
	}

});
