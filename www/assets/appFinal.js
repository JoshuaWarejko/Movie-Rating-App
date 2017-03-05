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
.run(["$rootScope", "$state", "Auth", "$window", "$cookies", function ($rootScope, $state, Auth, $window, $cookies) {

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
		$rootScope.currentState = $state.current;
	});

  if (!$rootScope.currentUser && $cookies.get('connect.sid')) {
    Auth.refresh();
  }

}]);
var env = window.env || "development";
var baseUrl;
var shopUrl;

if (env !== "development") {
	// Production
  baseUrl = '/api';
} else {
	// Development
  baseUrl = '//localhost:3000/api';
}

angular.module('app.constants', [])

.constant('CONFIG', {
  version: 1,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'h:mm a',
  dateTimeFormat: 'M/d/yyyy h:mm a',
  url: baseUrl,
  socketUrl: baseUrl,
  omdbUrl: 'http://www.omdbapi.com/'
});
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
angular.module('app.factories', [])

.factory('Auth', ["$rootScope", "$http", "$state", "$q", "CONFIG", "$window", "$cookies", function($rootScope, $http, $state, $q, CONFIG, $window, $cookies) {

  function register(form) {
    console.log("Factory register function hit!");
    return $q(function(resolve, reject) {
      $http.post(CONFIG.url + '/users/register', form).then(function(response) {
        console.log("The factory register response: ", response);
        return resolve(response.data);
      }, function(error) {
        console.log("The factory register error: ", error);
        return reject(error);
      });   
    });
  }

	function login(email, password) {
    return $q(function(resolve, reject) {
      $http.post(CONFIG.url + '/users/login', {email: email, password: password}).then(function(response) {
        return resolve(response.data);
      }, function(error) {
        console.log("The factory login error: ", error);
        return reject(error);
      });   
    });
  }

  function logout() {
  	return $q(function(resolve, reject) {
      $http.post(CONFIG.url + '/users/logout').then(function(response) {
        $rootScope.currentUser = null;
        $cookies.remove('connect.sid');
    		return resolve("Successfully logged out!");
      }, function(error) {
        $cookies.remove('connect.sid');
        return reject('Failed to log out user');
      });
  	}); 
  }

  function refresh() {
    return $http.post(CONFIG.url + '/users/refresh').then(function(response) {
      var user = response.data;
      $rootScope.currentUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };
    }, function(error) {
      console.error("Error loading user on refresh: ", error);
    });
  }

  return {
    register: register,
  	login: login,
  	logout: logout,
    refresh: refresh
  }

}])
angular.module('app.filters', [])

.filter('dateSeparator', ["$filter", function($filter) {
	var angularDateFilter = $filter('date');
	return function(theDate, separator) {
		return angularDateFilter(theDate, 'MM' + separator + 'dd' + separator + 'yyyy');
	}
}])

.filter('dateYearOnly', ["$filter", function($filter) {
	var angularDateFilter = $filter('date');
	return function(theDate) {
		var date = new Date(theDate);
		var year = date.getFullYear();
		return year;
	}
}])

;
'use strict';

angular.module('app.routes', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", "$urlMatcherFactoryProvider", function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider) {
  
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

}])
.run(['$rootScope', '$state',
	function ($rootScope, $state) {
		$rootScope.$state = $state;
	}
]);
'use strict';

angular.module('app.services', [])

.service('MovieService', ["$http", "CONFIG", "$q", function($http, CONFIG, $q) {
	this.getMovies = function() {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movies').then(function(response) {
				if(response.data.length > 0) {
					return resolve(response);
				} else {
					return reject("No movies yet");
				}
			}, function(error) {
				return reject("Error loading movies");
			});
		});
	};
}])

// Used for querying THe Online Movie Database
.service('OMDBService', ["$http", "CONFIG", "$q", function($http, CONFIG, $q) {
	this.getMoviesByTitle = function(title) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/' + title).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getMovieById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/by-id/' + id).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getMovieCreditsById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/' + id + "/credits").then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getMovieImagesById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/' + id + "/images").then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getPersonById = function(id) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/person/' + id).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
	this.getPopularMovies = function() {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-search/popular').then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject(error);
			});
		});
	}
}])

// Used for handling movies within the local database
.service('MovieTrackService', ["$http", "CONFIG", "$q", function($http, CONFIG, $q) {
	this.getAllTracked = function() {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-tracks/').then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject({ message: "Error loading tracked movies", error: error});
			});
		});
	}
	this.getTrackedMovies = function(userId) {
		return $q(function(resolve, reject) {
			$http.get(CONFIG.url + '/movie-tracks/' + userId).then(function(response) {
				return resolve(response);
			}, function(error) {
				return reject({ message: "Error loading tracked movies", error: error});
			});
		});
	}
}])

// User for returning time based things
.service('timeService', ["$filter", "CONFIG", function($filter, CONFIG) {
	this.getToday = function(){
		return $filter('date')(new Date(), CONFIG.dateFormat);
	}
}])

;
'use strict';

angular.module('app.errorController', [])

.controller('errorController', ["$scope", "$state", "$window", function($scope, $state, $window) {
	$scope.error = $window.error || $state.params.error;
	$window.error = null;
}]);
angular.module('app.feed_controller', [])

.controller('FeedController', ["$rootScope", "$scope", "$state", "$filter", "$window", "MovieTrackService", "OMDBService", function($rootScope, $scope, $state, $filter, $window, MovieTrackService, OMDBService) {

	$scope.trackedMovies = [];
	$scope.popularMovies = [];

	MovieTrackService.getAllTracked().then(function(response) {
		var tracked = $scope.trackedMovies = response.data;
		if(tracked.length == 0) {
			$scope.noTrackedMessage = "No movies have been tracked yet!";
		}
		for(var i = 0; i < tracked.length; i++) {
			var dateArray = new Date(tracked[i].updatedDate).toLocaleTimeString().split(':');
			var ampm = new Date(tracked[i].updatedDate).toLocaleTimeString().split(' ')[1];
			$scope.trackedMovies[i].time = dateArray[0].toString() + ':' + dateArray[1].toString() + ' ' + ampm;
		}
	}, function(error) {
		console.error(error);
	});

}]);
'use strict';

angular.module('app.homeController', [])

.controller('HomepageController', ["$rootScope", "$scope", "$state", "$filter", "$window", "MovieTrackService", "OMDBService", function($rootScope, $scope, $state, $filter, $window, MovieTrackService, OMDBService) {

	$scope.popularMovies = [];
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;
	var popularSlides = $scope.popularSlides = [];
	var popularSlideIndex = 0;
  
	// Get popular movies
  OMDBService.getPopularMovies().then(function(response) {
  	var popularMovies = $scope.popularMovies = response.data.results;
  	for(var i = 0; i < 5; i++) {
  		$scope.popularSlides.push({
  			image: 'https://image.tmdb.org/t/p/w1920' + popularMovies[i].backdrop_path,
  			title: popularMovies[i].title,
  			id: popularSlideIndex++
  		});
  	}
  }, function(error) {
  	console.error(error);
  });

}])
;
angular.module('app.login_controllers', [])

.controller('LoginController', ["$rootScope", "$scope", "$state", "Auth", function($rootScope, $scope, $state, Auth) {

	$scope.credentials = {
		username: '',
		password: ''
	}

	$scope.loginError = null;

	$scope.login = function() {
		$scope.loginError = null;
		Auth.login($scope.credentials.email, $scope.credentials.password).then(function(response) {
			$rootScope.currentUser = response;
			$state.go('index.profile');
		}, function(error) {
			console.error("Error while logging in: ", error);
			$scope.loginError = error.data;
		});
	}

}]);

'use strict';

angular.module('app.controllers', [
	'app.main_controllers', 
	'app.errorController', 
	'app.homeController', 
	'app.login_controllers', 
	'app.profile_controller',
	'app.register_controller',
	'app.movies_controller',
	'app.movie_controller',
	'app.person_controller',
	'app.feed_controller'
	]);


angular.module('app.main_controllers', [])

.controller('MainController', ["$rootScope", "$scope", "$state", "$filter", "$window", "timeService", "Auth", function($rootScope, $scope, $state, $filter, $window, timeService, Auth) {

	$rootScope.currentUser = null;

	$rootScope.today = timeService.getToday();
	$rootScope.currentYear = new Date($rootScope.today).getFullYear();
	$rootScope.rightNow = new Date();

	$scope.logout = function() {
		Auth.logout().then(function(response) {
			console.log("The logout response: ", response);
			$window.location.reload();
		})
	}

}])

.controller('NavigationController', ["$rootScope", "$scope", "$state", function($rootScope, $scope, $state) {
	$scope.nav = "Navigation Text";
}])
.controller('uibCarousel',function() {
	
});
;
angular.module('app.movie_controller', [])

.controller('MovieController', ["$rootScope", "$scope", "$state", "$stateParams", "MovieService", "OMDBService", function($rootScope, $scope, $state, $stateParams, MovieService, OMDBService) {

	$scope.movieError = null;
	$scope.movie = null;
	$scope.dataLoading = false;

	var getMovieInfo = function() {
		$scope.dataLoading = true;
		OMDBService.getMovieById($stateParams.movieId).then(function(response) {
			$scope.movie = response.data;
			OMDBService.getMovieCreditsById($stateParams.movieId).then(function(response) {
				$scope.movie.credits = response.data;
				$scope.dataLoading = false;
			}, function(error) {
				console.error("Error loading movie credits: ", error);
				$scope.movieError = error;
			});
			OMDBService.getMovieImagesById($stateParams.movieId).then(function(response) {
				$scope.movie.images = response.data;
			}, function(error) {
				console.error("Error loading movie images: ", error);
				$scope.movieError = error;
			});
		}, function(error) {
			console.error("Error loading movie information: ", error);
			$scope.movieError = error;
		});
	}

	// Call the function immediately.
	getMovieInfo();

}]);

angular.module('app.movies_controller', [])

.controller('MoviesController', ["$rootScope", "$scope", "$state", "MovieService", "OMDBService", function($rootScope, $scope, $state, MovieService, OMDBService) {

	$scope.moviesError = null;
	$scope.movies = null;
	$scope.noMovies = null;
	$scope.dataLoading = false;
	$scope.movie_search = {
		search: ''
	};
	
	$scope.getMovies = function(title) {
		$scope.movies = null;
		$scope.noMovies = null;
		$scope.dataLoading = true;
		OMDBService.getMoviesByTitle(title).then(function(response) {
			$scope.movies = response.data.results;
			if($scope.movies.length == 0) {
				$scope.noMovies = "No movies for search words";
			}
			$scope.dataLoading = false;
		}, function(error) {
			console.error(error);
			$scope.noMovies = error;
		});
	}

}]);

angular.module('app.person_controller', [])

.controller('PersonController', ["$rootScope", "$scope", "$state", "$stateParams", "MovieService", "OMDBService", function($rootScope, $scope, $state, $stateParams, MovieService, OMDBService) {

	$scope.personError = null;
	$scope.person = null;
	$scope.dataLoading = false;

	var getPersonInfo = function() {
		$scope.dataLoading = true;
		OMDBService.getPersonById($stateParams.personId).then(function(response) {
			$scope.person = response.data;
			$scope.dataLoading = false;
		}, function(error) {
			console.error("Error loading person information: ", error);
			$scope.personError = error;
		});
	}
	// Call function immediately to get data
	getPersonInfo();

}]);

angular.module('app.profile_controller', [])

.controller('ProfileController', ["$rootScope", "$scope", "Auth", "ngDialog", "MovieTrackService", function($rootScope, $scope, Auth, ngDialog, MovieTrackService) {

	$scope.trackedMovies = [];

	// Function to open the dialog popup for tracking movies
	$scope.trackMovie = function() {
		ngDialog.open({
			template: '../templates/dialogs/track_movie.html',
			className: 'ngdialog-theme-default track_movie',
			width: 900,
			showClose: true,
			controller: 'TrackMovieController',
			closeByNavigation: true
		});
	}

	// Load the users tracked movies
	$rootScope.$on('reloadTrackedMovies', function() {
		MovieTrackService.getTrackedMovies($rootScope.currentUser.id).then(function(response) {
			$scope.trackedMovies = response.data;
		}, function(error) {
			console.error(error);
		});
	});

	$rootScope.$broadcast('reloadTrackedMovies');

}])

.controller('TrackMovieController', ["$rootScope", "$scope", "$timeout", "$http", "CONFIG", "ngDialog", "OMDBService", function($rootScope, $scope, $timeout, $http, CONFIG, ngDialog, OMDBService) {

	$scope.movie_search = '';
	$scope.search_items = [];
	$scope.chosen = { movie: null };
	$scope.movie_selected = false;
	$scope.tracked = {
		date_watched: $scope.today,
		review_text: '',
		rating: ''
	}
	$scope.trackError = null;

	$scope.getNewResults = function() {
		OMDBService.getMoviesByTitle($scope.movie_search).then(function(response) {
			$scope.search_items = response.data.results;
		}, function(error) {
			console.error(error);
		});
	}

	$scope.selectMovie = function(movie) {
		$scope.chosen.movie = movie;
		$scope.movie_selected = true;
		$scope.movie_search = '';
		$scope.search_items = [];
	}

	$scope.backToSelect = function() {
		$scope.movie_selected = false;
		$scope.chosen.movie = null;
	}

	$scope.saveMovieTrack = function() {
		$scope.chosen.movie.omdbId = $scope.chosen.movie.id;
		$http.post(CONFIG.url + '/movie-tracks', {
			movie: $scope.chosen.movie,
			tracked: $scope.tracked,
			userId: $rootScope.currentUser.id
		}).then(function(response) {
			console.log("The movie track response: ", response);
			ngDialog.close();
			$rootScope.$broadcast('reloadTrackedMovies');
		}, function(error) {
			console.error(error);
			$scope.trackError = error;
		})
	}

}])
;
angular.module('app.register_controller', [])

.controller('RegisterController', ["$rootScope", "$scope", "$state", "Auth", function($rootScope, $scope, $state, Auth) {

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
		Auth.register($scope.form).then(function(response) {
			console.log("The register response: ", response);
			$rootScope.currentUser = response.data;
			$state.go('index.profile');
		}, function(error) {
			console.error("Error while registering: ", error);
			$scope.registerError = error.data;
		});
	}

}]);
