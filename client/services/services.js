angular.module('services', [])

.factory('Twitter', function($http) {

  var getTweets = function(request) {
    return $http({
      method: 'GET',
      url: 'api/twitter',
      params: request
    })
    .then(function(response) {
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
      query: request.query,
      location: request.city, //!!! need to add logic of inserting the location field depending on user input (if there is only state, put state, if there is no location, search for all US,  etc.)
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
.factory('Location', function($http) {
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
      console.log('response', response);
      var latitude = response.results[0].geometry.location.lat;
      var longitude = response.results[0].geometry.location.lng;
      var coords = [lattitude, longitude];
      var coords = {
        latitude: latitude,
        longitude: longitude
      };
      console.log('coords', coords);
      return coords;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  return {
    getLocation: getLocation
  };
});