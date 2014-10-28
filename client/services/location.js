/*
*  Converts a street address into geo coordinates, needed for instagram & twitter apis
*/
angular.module('location', [])
.factory('Location', function($http) {
  /**
  * @function
  * @memberof AngularModule_Factories.Location
  * @description Location Contact google maps api to grab geo cooridinates for current location
  * @param {object} request Request object for request
  * @param {string} request.street (Optional) Street Address
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  */
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

  /**
  * @class AngularModule_Factories.Location
  * @memberof AngularModule_Factories
  * @description Angular Factory: This module can contact google to get Lattitude Longitude coordinates for selected city locations
  * @property {function} getLocation Contact google maps api to grab geo cooridinates for current location
  */
  return {
    getLocation: getLocation
  };
});