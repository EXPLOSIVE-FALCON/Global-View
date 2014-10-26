angular.module('splashBox', ['globalMethods'])
.controller('BoxController', function ($scope, GlobalMethods) {
  $scope.data = {
    boxes: []
  };
  $scope.populate = function(city, state, topic) {
    console.log('hell yah');
    var requestObj = {
      city: city,
      state: state,
      query: topic,
      date: new Date(),
      street: "944 market st"
    }
    
    GlobalMethods.getNews(requestObj);
    GlobalMethods.getTweets(requestObj);
    GlobalMethods.getPhotos(requestObj); 
  };
});