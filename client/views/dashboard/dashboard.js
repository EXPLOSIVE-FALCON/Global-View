angular.module('dashboard', ['storedData', 'globalMethods'])
.controller('DashboardController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = StoredData;
  $scope.GlobalMethods = GlobalMethods;

  console.log("hey", $scope.GlobalMethods);
});