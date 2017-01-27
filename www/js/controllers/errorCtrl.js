'use strict';

angular.module('app.errorController', [])

.controller('errorController', function($scope, $state, $window) {
	$scope.error = $window.error || $state.params.error;
	$window.error = null;
});