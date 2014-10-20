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
      templateUrl: 'views/tweets/tweets.html',
      controller: 'TweetsController'
    })
    .when('/news', {
      templateUrl: 'views/news/news.html',
      controller: 'NewsController'
    })
    .when('/photos', {
      templateUrl: 'views/photos/photos.html',
      controller: 'PhotoController'
    })
    .otherwise({
      redirectTo: '/'
    });
});