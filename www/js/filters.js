angular.module('app.filters', [])

.filter('dateSeparator', function($filter) {
	var angularDateFilter = $filter('date');
	return function(theDate, separator) {
		return angularDateFilter(theDate, 'MM' + separator + 'dd' + separator + 'yyyy');
	}
})

;