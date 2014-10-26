/*
*  Returns Tweets
*/
angular.module('service_twitter', [])
.factory('Twitter', function($http) {
  var getTweets = function(request) {
    return $http({
      method: 'GET',
      url: 'api/twitter',
      params: request
    })
    .then(function(response) {
      console.log(response);  
      return response.data
    })
    .catch(function(error){
      console.error(error);
    });
  };
  var getTrending = function(request) {
    return $http({
      method:'GET',
      url: '/api/twitterTrendingCities'
    })
    .then(function(response){
      console.dir(response);
      return response.data
    });
  };
  return {
    getTweets: getTweets,
    getTrending: getTrending
  };
});