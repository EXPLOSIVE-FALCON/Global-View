angular.module('news', [])

.controller('NewsController', function ($scope, GoogleNews) {
  $scope.data = {};
  $scope.getNews = function(request) {
    console.log('request', request);
    GoogleNews.getNews(request)
      .then(function(result) {
        $scope.data = result.data;
        console.log('inside get', $scope.data);
      })
  };
});