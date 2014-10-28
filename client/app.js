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
    .when('/', {
      templateUrl: 'views/splash/splashMain/splash_main.html',
      controller: 'SplashController'
    })
    .otherwise({
      redirectTo: '/'
    });
});