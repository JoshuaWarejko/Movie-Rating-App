'use strict';

var directiveDirectory = '/templates/directives/';

angular.module('app.directives', [])

// Header for site
.directive('header', function() {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: directiveDirectory + 'header.html'
	}
})
// Navigaion for header
.directive('navbar', function() {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: directiveDirectory + 'navbar.html'
	}
})
// Header for site
.directive('footer', function() {
	return {
		restrict: 'E',
		scope: false,
		templateUrl: directiveDirectory + 'footer.html'
	}
})
;