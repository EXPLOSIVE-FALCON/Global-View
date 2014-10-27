angular.module('vantage', [
  'tweets',
  'news',
  'search',
  'photos',
  'dashboard',
  'splashMain',
  'splashBox',
  'topics',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/dashboard', {
      templateUrl: 'views/dashboard/dashboard.html',
      controller: 'DashboardController'
    })    
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
    .when('/', {
      templateUrl: 'views/splash/splashMain/splash_main.html',
      controller: 'SplashController'
    })
    .otherwise({
      redirectTo: '/'
    });
});