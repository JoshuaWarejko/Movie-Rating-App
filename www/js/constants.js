var env = window.env || "development";
var baseUrl;
var shopUrl;

if (env === "production") {
  baseUrl = '';
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
  socketUrl: baseUrl
});