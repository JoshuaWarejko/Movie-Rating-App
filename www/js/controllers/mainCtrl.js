'use strict';

angular.module('app.controllers', ['app.errorController', 'app.homeController'])

.controller('MainController', function($rootScope, $scope, $state, $filter, $window) {

	$rootScope.currentStateId = null;

});