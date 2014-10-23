/*
*  Converts a street address into geo coordinates, needed for instagram & twitter apis
*/
angular.module('service_location', [])
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