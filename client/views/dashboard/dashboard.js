angular.module('dashboard', ['globalData', 'globalMethods'])
.controller('DashboardController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = StoredData;
  $scope.GlobalMethods = GlobalMethods;

  var populate = function(city, trendingTopic) {
    
  };
});