/*
*  Search Controller (Depreciated) -  Can be used to build a manual search bar
*/
angular.module('search', ['storedData', 'globalMethods'])
.controller('SearchController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = StoredData;
  $scope.GlobalMethods = GlobalMethods;
});
