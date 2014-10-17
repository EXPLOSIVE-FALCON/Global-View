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

  var getInstaPhotos = function(request) {
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
    getInstaPhotos: getInstaPhotos
  };
})


.factory('GoogleNews', function($http){
  // search term, location, and amount of results to return
  var getNews = function(params) {
    return $http({
      method: 'GET',
      url: '/api/google',
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