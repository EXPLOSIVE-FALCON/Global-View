angular.module('vantage', [
  'tweets',
  'news',
  'search',
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
    .when('/search', {
      templateUrl: 'views/serach/search.html',
      controller: 'SearchControler'
    })
    .otherwise({
      redirectTo: '/'
    });
});