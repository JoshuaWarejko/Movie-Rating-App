'use strict';

angular.module('app.factories', [])

.factory('AuthService', function($cookies) {

	// Default to False
	var isAuthenticated = false;

	// Store Logged in Status
	function loadUserCredentials() {
		console.log($cookies);
		if ($cookies.testCookie)
			isAuthenticated = true;
	}

	// Check credentials on load
	loadUserCredentials();

	return {
		isAuthenticated: function() {return isAuthenticated;},
		update: loadUserCredentials
	};
})
;