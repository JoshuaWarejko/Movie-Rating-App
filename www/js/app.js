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
]);
app.run(function ($rootScope, $state, $window) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
  	var stateData = toState.data;
  	
  	if($window.error && toState.name !== '404') {
  		$state.go('404', {
  			error: $window.error
  		});
  	}
  });
});