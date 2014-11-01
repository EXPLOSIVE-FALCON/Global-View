angular.module('background', ['storedData', 'globalMethods'])
.controller('BackgroundController', function ($scope, StoredData, GlobalMethods) {

  $scope.data = StoredData;
  $scope.GlobalMethods = GlobalMethods;

});
