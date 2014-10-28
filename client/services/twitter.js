/*
*  Returns Tweets
*/
angular.module('twitter', [])
.factory('Twitter', function($http) {
  /**
  * @function
  * @memberof AngularModule_Factories.Twitter
  * @description Contacts Server to grab list of tweets using trending topic (query) and stores the results in [StoredData.tweets]{@link AngularModule_Factories.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  */
  var getTweets = function(request) {
    return $http({
      method: 'GET',
      url: 'api/tweetPerTrend',
      params: request
    })
    .then(function(response) {
      console.dir(response);
      var results = [];
      angular.forEach(response.data.data,function(tweets,index){
        angular.forEach(tweets,function(tweet,index){
          results.push(tweet);
          console.log('tweet', tweet);
          console.log('url', tweet.user.url);
        })
      });
      return results;
    })
    .catch(function(error){
      console.error(error);
    });
  };
  /**
  * @function
  * @memberof AngularModule_Factories.Twitter
  * @description Contacts Server to grab list of cities and trending topics for those cities and stores the results in [StoredData.cities]{@link AngularModule_Factories.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  */
  var getTrending = function(request) {
    return $http({
      method:'GET',
      url: '/api/twitterTrendingCities'
    })
    .then(function(response){
      return response.data
    });
  };

  /**
  * @class AngularModule_Factories.Twitter
  * @memberof AngularModule_Factories
  * @description Angular Factory: This module contains all functionality to interact with Twitter
  * @property {function} getTrending Contacts Server to grab list of cities and trending topics for those cities
  * @property {function} getTweets Contacts Server to grab list of tweets using trending topic (query)
  */
  return {
    getTweets: getTweets,
    getTrending: getTrending
  };
});
