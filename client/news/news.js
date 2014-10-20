angular.module('news', [])

.controller('NewsController', function ($scope, GoogleNews) {
  $scope.data = {};
  $scope.getNews = function(request) {
    GoogleNews.getNews(request)
      .then(function(result) {
        $scope.data = result.data;
        console.log('inside get', $scope.data);
      })
  };
  // $scope.getNews({
  //   query: 'ebola',
  //   location: 'san francisco',
  //   amount: 5
  // });
  // console.log('after ebole',$scope.data);
});