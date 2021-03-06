var env = window.env || "production";
var baseUrl;
var shopUrl;

if (env === "production") {
  baseUrl = '/api';
} else { // Development
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