/*
*  Topic Controller - Used to control topics on Dashboard
*/
angular.module('topics', ['storedData', 'globalMethods'])
.controller('TopicController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = StoredData;
  $scope.changeTopic = function(topic, lat, lng, maxtime, mintime) {
    var requestObj = StoredData.currentCity;
    requestObj.lattitude = lat;
    requestObj.longitude = lng;
    requestObj.max_timestamp = maxtime;
    requestObj.min_timestamp = mintime;
    requestObj.query = topic;
    GlobalMethods.getNews(requestObj);
    GlobalMethods.getTweets(requestObj);
    GlobalMethods.getPhotos(requestObj);
  }

  $scope.selected = 0;
  $scope.select= function(index) {
     $scope.selected = index;
  };
});
