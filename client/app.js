angular.module('vantage', [
  'services',
  'tweets',
  'news',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/tweets', {
      templateUrl: 'tweets/tweets.html',
      controller: 'TweetsController'
    })
    .when('/news', {
      templateUrl: 'news/news.html',
      controller: 'NewsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});