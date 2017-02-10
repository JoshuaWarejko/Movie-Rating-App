angular.module('app.filters', [])

.filter('dateSeparator', function($filter) {
	var angularDateFilter = $filter('date');
	return function(theDate, separator) {
		return angularDateFilter(theDate, 'MM' + separator + 'dd' + separator + 'yyyy');
	}
})

.filter('dateYearOnly', function($filter) {
	var angularDateFilter = $filter('date');
	return function(theDate) {
		var date = new Date(theDate);
		var year = date.getFullYear();
		return year;
	}
})

;