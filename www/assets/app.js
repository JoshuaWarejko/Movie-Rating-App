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
app.run(["$rootScope", "$state", "$window", function ($rootScope, $state, $window) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
  	var stateData = toState.data;
  	
  	if($window.error && toState.name !== '404') {
  		$state.go('404', {
  			error: $window.error
  		});
  	}
  });
}]);
var env = env || "development";
var baseUrl;
var shopUrl;

if (env === "production" || env === "prod" || env === "staging" || env === "stage") {
  baseUrl = 'http://localhost:3000';
  baseUrl = 'http://localhost:3000';
} else { // Development
  baseUrl = 'http://localhost:3000';
  baseUrl = 'http://localhost:3000';
}

angular.module('app.constants', [])

.constant('CONFIG', {
  version: 1,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'h:mm a',
  dateTimeFormat: 'M/d/yyyy h:mm a',
  url: baseUrl,
  shopUrl: shopUrl,
  socketUrl: baseUrl
});
'use strict';

angular.module('app.directives', [])

;
'use strict';

angular.module('app.factories', [])

.factory('AuthService', ["$cookies", function($cookies) {

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
}])
;
angular.module('app.filters', [])

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

	$httpProvider.interceptors.push(["$timeout", "$q", "$injector", function ($timeout, $q, $injector) {
		var $http, $state;

		// this trick must be done so that we don't receive
		// `Uncaught Error: [$injector:cdep] Circular dependency found`
		$timeout(function () {
			$http = $injector.get('$http');
			$state = $injector.get('$state');
		});

		return {
			responseError: function (rejection) {
				if (rejection.status !== 401) {
					return rejection;
				}
				$state.go('login');
			}
		};
	}]);
  
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
		controller: 'HomepageController'
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

.service('BlankService', ["$http", "CONFIG", function($http, CONFIG) {

}])
;
'use strict';

angular.module('app.errorController', [])

.controller('errorController', ["$scope", "$state", "$window", function($scope, $state, $window) {
	$scope.error = $window.error || $state.params.error;
	$window.error = null;
}]);
'use strict';

angular.module('app.homeController', [])

.controller('HomepageController', ["$rootScope", "$scope", "$state", "$filter", "$window", function($rootScope, $scope, $state, $filter, $window) {

	$scope.pageTitle = "Homepage";

}]);
'use strict';

angular.module('app.controllers', ['app.errorController', 'app.homeController'])

.controller('MainController', ["$rootScope", "$scope", "$state", "$filter", "$window", function($rootScope, $scope, $state, $filter, $window) {

	$rootScope.currentStateId = null;

}]);