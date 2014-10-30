angular.module('vantage', [
  'tweets',
  'news',
  'search',
  'photos',
  'dashboard',
  'splashMain',
  'splashBox',
  'topics',
  'ui.router',
  'famous.angular',
  'background'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/dashboard/dashboard.html',
      controller: 'DashboardController'
    })

    .state('entry', {
      url: '/',
      templateUrl: 'views/splash/splashMain/splash_main.html',
      controller: 'SplashController'
    });

    $urlRouterProvider.otherwise('/');
});