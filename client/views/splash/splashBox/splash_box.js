/*
*  Box Controller ("City Tiles") -  Tiles Contain Data for City. 
*/
angular.module('splashBox', ['globalMethods'])
.controller('BoxController', function ($scope, GlobalMethods) {
  $scope.data = {
    boxes: []
  };
  $scope.populate = function(city, state, topic) {
    var requestObj = {
      city: city,
      state: state,
      query: topic,
      date: new Date(),
      street: "944 market st"
    }
    $('.a_splashHome').hide();
    GlobalMethods.getNews(requestObj);
    GlobalMethods.setCity(requestObj);
    GlobalMethods.getTweets(requestObj);
    GlobalMethods.getPhotos(requestObj);
  };
});
