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

	// Login
	.state('login', {
		url: '/login',
		templateUrl: '/templates/login.html',
		controller: 'LoginController',
		authenticate: false
	})

	// Register
	.state('register', {
		url: '/register',
		templateUrl: '/templates/register.html',
		controller: 'RegisterController',
		authenticate: false
	})

	// Homepage
	.state('index', {
		url: '',
		templateUrl: '/templates/homepage.html',
		controller: 'HomepageController',
		authenticate: false
	})

	// User Feed
	.state('index.feed', {
		url: '/feed',
		templateUrl: '/templates/feed.html',
		controller: 'FeedController',
		authenticate: false
	})

	// Movies
	.state('index.movies', {
		url: '/movies',
		templateUrl: '/templates/movies.html',
		controller: 'MoviesController',
		authenticate: false
	})

	// Movies
	.state('index.movies.movie', {
		url: '/{movieId}',
		templateUrl: '/templates/movie.html',
		controller: 'MovieController',
		params: {
			movieId: null
		},
		authenticate: false
	})

	// Movies
	.state('index.person', {
		url: '/person/{personId}',
		templateUrl: '/templates/person.html',
		controller: 'PersonController',
		params: {
			personId: null
		},
		authenticate: false
	})

	// Profile
	.state('index.profile', {
		url: '/profile',
		templateUrl: '/templates/profile.html',
		controller: 'ProfileController',
		authenticate: true
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