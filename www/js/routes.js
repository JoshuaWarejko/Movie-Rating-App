'use strict';

angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider) {
  
  $urlRouterProvider.rule(function($injector, $location) {
		var path = $location.path();
		var hasTrailingSlash = path[path.length-1] === '/';
	  if(hasTrailingSlash) {  
	  		var newPath = path.substr(0, path.length - 1);
	  		return newPath; 
		}
	});
	
	$urlMatcherFactoryProvider.strictMode(false);
  
  $stateProvider
  .state('404', {
		templateUrl: '/templates/404.html',
		controller: 'errorController',
		params: {
			error: null
		}
	})

	// Homepage
	.state('index', {
		url: '',
		templateUrl: '/templates/homepage.html',
		controller: 'HomepageController',
		authenticate: true
	})

	// Login
	.state('login', {
		url: '/login',
		templateUrl: '/templates/login.html',
		controller: 'LoginController'
	})

	;
		
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	
	$urlRouterProvider.when('', '/');
	

	$urlRouterProvider.otherwise(function($injector, $location){
	  $injector.invoke(['$state', function($state) {
	    $state.go('404');
	  }]);
	}); 

})
.run(['$rootScope', '$state',
	function ($rootScope, $state) {
		$rootScope.$state = $state;
	}
]);