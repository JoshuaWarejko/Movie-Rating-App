angular.module('app.login_controllers', [])

.controller('LoginController', function($rootScope, $scope, Auth) {

	$scope.credentials = {
		username: '',
		password: ''
	}

	$scope.loginError = null;

	$scope.login = function() {
		$scope.loginError = null;
		console.log("Login function hit!");
		Auth.login($scope.credentials.email, $scope.credentials.password).then(function(response) {
			$rootScope.currentUser = response;
		}, function(error) {
			console.error("Error while logging in: ", error);
			$scope.loginError = error.data;
		});
	}

});
