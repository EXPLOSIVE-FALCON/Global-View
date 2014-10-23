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
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  return {
    getTweets: getTweets
  };
});