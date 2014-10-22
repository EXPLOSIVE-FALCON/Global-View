angular.module('news', [])

.controller('NewsController', function ($scope, GoogleNews, Location, Query) {
  $scope.data = {};
  $scope.getNews = function(request) {
    console.log('request', request);
    GoogleNews.getNews(request)
      .then(function(result) {
        $scope.data = result.data;
        console.log('inside get', $scope.data);
      })
  };

  $scope.getLocation = function(request) {
    console.log('inside location cntrl, request:', request);
    Location.getLocation(request)
      .then(function(result) {
        console.log('result', result);
      })
  };

  $scope.getData = function(request) {
    console.log('inside getData cntrl, request:', request);
    Query.getData(request)
      .then(function(result) {
        // $scope.data = result.data;
        console.log('result', result);
      })
  };

});