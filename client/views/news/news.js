/*
*  News Controller can be used to make news stories
*/
angular.module('news', ['storedData', 'globalMethods'])
.controller('NewsController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = {
    news: StoredData.news
  };
  $scope.getNews = GlobalMethods.getNews;
});