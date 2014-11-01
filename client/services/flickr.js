/*
*  Get city images from Flickr
*/

// var flickrKeys = require('../flickrKeys');

angular.module('flickr', [])
.factory('Flickr', function($http) {

  var setCityImages = function(request) {

    return $http({
      method: 'GET',
      url: 'api/flickr',
      params: request
    })
    .then(function(response) {


      var parseBody = JSON.parse(response.data.data.body);
      
      var getPhotoId = parseBody.photos.photo[0].id;

      return $http({
            method: 'GET',
            url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + 
            '2960fd012df4bcc92af9841f04a913a4' + '&photo_id=' + getPhotoId +'&format=json&nojsoncallback=1'
          })
          .then(function(response) {
      console.log("RESPONSE", response);
            return response;
          })
          .catch(function(error) {
            console.error(error);
          })
          
      return response;
    })
    .catch(function(error) {
      console.error(error);
    })
  };


  return {
    setCityImages: setCityImages,

  };
  
});