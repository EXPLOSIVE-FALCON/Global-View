angular.module('services', [])

.factory('Query', function($q, $http, Location, Twitter, Instagram, GoogleNews){

  var getData = function(request){
    console.log('inside getData');

    var params = {
      street: request.street,
      city: request.city,
      state: request.state
    };

    //request to get info from all services. Need to get latitude and longitude before sending request to the Instagram and Twitter
    return $q.all([
      GoogleNews.getNews(request),
      Location.getLocation(params)
    ]).then(function(results) {
      var instaParams = {
          query: request.query,
          lat: results[1].latitude,
          lng: results[1].longitude,
          min_timestamp: +request.date,
          max_timestamp: moment(request.date).add(1, 'days').valueOf(),
          distance: 1000,
          amount: 8 //!!! need to change it when we get scrolling
        };

      // var tweetParams = {
      //   query: request.query,
      //   latitude: results[1].latitude,
      //   longitude: results[1].longitude
      // };

      return $q.all([
          Instagram.getPhotos(instaParams)
          // Twitter.getTweets(tweetParams)
        ]). then(function(data){
          return {
            news: results[0].data,
            photos: data[0].data
            // tweets: data[1]
          };
        })
        .catch(function(error){
          console.error(error);
        })
    })
    .catch(function(error){
      console.error(error);
    })
  }

  return {
    getData: getData
  }
})

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
      url: 'api/instagram',
      params: request
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
    var params = {
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
      address: request.street + ',' + request.city + ',' +request.state
    };

    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: params
    })
    .then(function(response) {
      var result = response.data.results[0];
      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
      };
    })
    .catch(function(error){
      console.error(error);
    });
  };

  return {
    getLocation: getLocation
  };
});