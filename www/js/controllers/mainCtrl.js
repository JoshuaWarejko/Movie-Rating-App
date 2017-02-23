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

.controller('MainController', function($rootScope, $scope, $state, $filter, $window, timeService, Auth) {

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

})

.controller('NavigationController', function($rootScope, $scope, $state) {
	$scope.nav = "Navigation Text";
})
.controller('uibCarousel',function() {
	
});
;