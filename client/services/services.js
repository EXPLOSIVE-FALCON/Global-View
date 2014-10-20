angular.module('services', [])

.factory('Query', function($http){

})

.factory('Twitter', function($http) {

  var getTweets = function(request) {
    return $http({
      method: 'GET',
      url: 'api/twitter'
    })
    .then(function(response) {
      console.log('response.data');
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  return {
    getTweets: getTweets
  };
})


.factory('Instagram', function($http) {

  var getPhotos = function(request) {
    return $http({
      method: 'GET',
      url: 'api/instagram'
    })
    .then(function(response){
      console.log('response.data');
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    })
  };

  return {
    getPhotos: getPhotos
  };
})


.factory('GoogleNews', function($http) {
  // search term, location, and amount of results to return
  var getNews = function(request) {
    //creating the object with request for this service
    params = {
      query: request.event,
      location: request.city, //!!! need to add logic of inserting the location field depending on user request (if there is only state, put state etc.)
      amount: 5
    };
    return $http({
      method: 'GET',
      url: '/api/googlenews',
      params: params
    })
    .then(function(response){
      console.log('response.data');
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  return {
    getNews: getNews
  };
})

// converts a street address into geo coordinates, needed for instagram & twitter apis
.factory('GetLocation', function($http) {
  var getLocation = function(request) {
    var params = {
      street: request.street,
      city: request.city,
      state: request.state
    };

    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: params
    })
    .then(function(response) {
      var lattitude = response.results[0].geometry.location.lat;
      var longitude = response.results[0].geometry.location.lng;
      var coords = [lattitude, longitude];
      console.log(coords);
      return coords;
    });
  };

  return {
    getLocation: getLocation
  };
});