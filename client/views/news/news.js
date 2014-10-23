angular.module('news', ['globalData', 'globalMethods'])
.controller('NewsController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = {
    news: StoredData.data.news
  };
  $scope.getNews = GlobalMethods.getNews;
});