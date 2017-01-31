'use strict';

angular.module('app.services', [])

.service('BlankService', function($http, CONFIG) {

})

.service('timeService', function($filter, CONFIG) {
	this.getToday = function(){
		return $filter('date')(new Date(), CONFIG.dateFormat);
	}
})

;