angular.module('googleNews', [])
.factory('GoogleNews', function($http) {
  /**
  * @function
  * @memberof AngularModule_Factories.GoogleNews
  * @description Contact Server to Scrape news results for current topic & location and stores the results in [StoredData.news]{@link AngularModule_Factories.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  * @param {number} request.amount (Optional, Default 5) Number of results to return
  */
  var getNews = function(request) {
    var params = {
      query: request.query,
      location: request.state, 
      amount: request.amount || 5
    };
    return $http({
      method: 'GET',
      url: '/api/googlenews',
      params: params
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    });
  }; 

  /**
  * @class AngularModule_Factories.GoogleNews
  * @memberof AngularModule_Factories
  * @description Angular Factory: This module contains all functionality to interact with server to scrape news from news.google.com
  * @property {function} getNews Contact Server to Scrape news results for current topic & location
  */
  return {
    getNews: getNews
  };
});