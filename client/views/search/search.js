/*
*  Search Controller Access's all search functionality
*/
angular.module('search', ['storedData', 'globalMethods'])
.controller('SearchController', function ($scope, StoredData, GlobalMethods) {
  // $scope.data = {
  //   news: StoredData.data.news,
  //   photos: StoredData.data.photos,
  //   tweets: StoredData.data.tweets
  // };
  $scope.data = StoredData;
  $scope.GlobalMethods = GlobalMethods;
});
