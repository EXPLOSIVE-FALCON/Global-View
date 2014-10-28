/*
*  Returns Tweets
*/
angular.module('service_twitter', [])
.factory('Twitter', function($http) {
  var getTweets = function(request) {
    return $http({
      method: 'GET',
      url: 'api/tweetPerTrend',
      params: request
    })
    .then(function(response) {
      var results = [];
      angular.forEach(response.data.data,function(tweets,index){
        angular.forEach(tweets,function(tweet,index){
          results.push(tweet);
        })
      });
      return results;
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
      return response.data
    });
  };
  return {
    getTweets: getTweets,
    getTrending: getTrending
  };
});