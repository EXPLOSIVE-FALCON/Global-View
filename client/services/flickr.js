/*
*  Get city images from Flickr
*/
angular.module('flickr', [])
.factory('Flickr', function($http) {
  var setCityImages = function(request) {
  // console.log("2: FACTORY REQUEST", request);
    return $http({
      method: 'GET',
      url: 'api/flickr',
      data: request
    })
    .then(function(response) {
      // console.log("3: THEN FACTORY RESPONSE", response);
      return response;
    })
    .catch(function(error) {
      console.error(error);
    })
  };


  return {
    setCityImages: setCityImages
  };
});