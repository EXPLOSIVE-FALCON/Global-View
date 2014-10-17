angular.module('vantage', [
  'services',
  'tweets',
  'ngRoute'
  ])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/tweets', {
      templateUrl: 'tweets/tweets.html',
      controller: 'TweetsController'
    })
    .otherwise({
      redirectTo: '/'
    })
})