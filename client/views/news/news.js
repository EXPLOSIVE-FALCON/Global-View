angular.module('news', [])

.controller('NewsController', function ($scope, GoogleNews, Location) {
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

  // $scope.getData = function(request) {
  //   Query.getData(request)
  //     .then(function(data) {
  //       $scope.data = data;
  //       console.log('$scope.data', $scope.data);
  //     })
  // };

});