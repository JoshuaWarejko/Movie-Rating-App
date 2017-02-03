angular.module('app.factories', [])

.factory('Auth', function($rootScope, $http, $state, $q, CONFIG, $window, $cookies) {

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
        email: user.email
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

})