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