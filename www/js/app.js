var app = angular.module('MovieRating', [
	'ngCookies',
	'ngAnimate',
	'ngSanitize',
	'ngTouch',
	'ui.router',
	'ui.bootstrap',
	'720kb.datepicker',
	'ngDialog',
	'app.controllers',
	'app.routes',
	'app.services',
	'app.factories',
	'app.directives',
	'app.constants',
	'app.filters'
])
.run(function ($rootScope, $state, Auth, $window, $cookies) {

  // Check if user is Authenticated
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

		if (!$cookies.get('connect.sid') && toState.name !== 'login' && toState.authenticate) {
	  	event.preventDefault();
	  	$state.go('login');
	  }

  	if (!$rootScope.page_title && $window.page_title) {
  		$rootScope.page_title = $window.page_title;
  	}

  });

  $rootScope.$on('$stateChangeSuccess', function() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});

  if (!$rootScope.currentUser && $cookies.get('connect.sid')) {
    Auth.refresh();
  }

});