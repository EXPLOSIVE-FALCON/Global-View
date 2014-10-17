angular.module('vantage', [
  'services',
  'tweets',
  'news',
  'photos',
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
    .when('/photos', {
      templateUrl: 'photos/photos.html',
      controller: 'PhotoController'
    })
    .otherwise({
      redirectTo: '/'
    });
});