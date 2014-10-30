/*
*  Box Controller ("City Tiles") -  Tiles Contain Data for City. 
*/
angular.module('splashBox', ['globalMethods'])
.controller('BoxController', function ($scope, GlobalMethods) {
  $scope.data = {
    boxes: []
  };
  $scope.populate = function(city, state, topic, lat, lng, mintime, maxtime) {

    var requestObj = {
      city: city,
      latitude: lat,
      longitude: lng,
      state: state,
      query: topic,
      min_timestamp: mintime,
      max_timestamp: maxtime,
      date: new Date(),
      street: "944 market st", 
    }
    $('.a_splashHome').hide();


    GlobalMethods.getNews(requestObj);
    GlobalMethods.setCity(requestObj);
    GlobalMethods.getTweets(requestObj);
    GlobalMethods.getPhotos(requestObj);
    GlobalMethods.setCityImages(requestObj);
  };

});


// lat: result.latitude,
//           lng: result.longitude,
//           min_timestamp: +request.date,
//           max_timestamp: moment(request.da