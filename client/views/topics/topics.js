/*
*  Topic Controller can be used to control topics
*/
angular.module('topics', ['globalData', 'globalMethods'])
.controller('TopicController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = StoredData;
  $scope.changeTopic = function(topic) {
    var requestObj = StoredData.currentCity;
    requestObj.query = topic;
    GlobalMethods.getNews(requestObj);
    // GlobalMethods.getTweets(requestObj);
    GlobalMethods.getPhotos(requestObj);
  }
});