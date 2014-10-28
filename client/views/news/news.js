/*
*  News Controller (Depreciated) -  will work if used however
*/
angular.module('news', ['storedData', 'globalMethods'])
.controller('NewsController', function ($scope, StoredData, GlobalMethods) {
  $scope.news = StoredData.news
  $scope.getNews = GlobalMethods.getNews;
});