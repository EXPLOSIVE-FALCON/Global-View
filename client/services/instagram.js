/*
*  Grabs Photos from instagram
*/
angular.module('instagram', [])
.factory('Instagram', function($http) {
  /**
  * @function
  * @memberof Angular_Modules.Instagram
  * @description Contact Server to grab photos on trending topic for current city and stores the results in [StoredData.photos]{@link Angular_Modules.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  */
  var getPhotos = function(request) {
    return $http({
      method: 'GET',
      url: 'api/instagram',
      params: request
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.error(error);
    })
  };

  /**
  * @class Angular_Modules.Instagram
  * @memberof Angular_Modules
  * @description Angular Factory: This module contains all functionality to interact with instagram
  * @property {function} getPhotos Contact Server to Grab Photos on trending topic for current city
  */
  return {
    getPhotos: getPhotos
  };
});