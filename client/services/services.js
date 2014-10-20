angular.module('services', [])

.factory('Twitter', function($http){

  var getTweets = function(request) {
    return $http({
      method: 'GET',
      url: 'api/twitter'
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
    getTweets: getTweets
  };
})


.factory('Instagram', function($http){

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


.factory('GoogleNews', function($http){
  // search term, location, and amount of results to return
  var getNews = function(request) {
    //creating the object with request for this service
    params = {
      query: request,
      location: 'MN', // !!! need to change after getting the location from user
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
});