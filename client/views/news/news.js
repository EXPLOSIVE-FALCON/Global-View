angular.module('news', ['service_news'])

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
});