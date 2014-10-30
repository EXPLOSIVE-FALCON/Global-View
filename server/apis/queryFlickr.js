/**
* @module queryFlickr
*/
var request = require('request');
var util = require('util');
var _ = require('lodash');
var flickrKeys = require('../flickrKeys');
var Flickr = require("flickrapi");


module.exports = function(city, someCallback) {

  city = 'Seattle';

  var requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
                    flickrKeys.api_key + 
                    '&text=' + 
                    city + 
                    '&per_page=1&format=json&nojsoncallback=1';

  request(requestURL, someCallback);


  // Flickr.tokenOnly(flickrKeys, function(error, flickr) {

  //   flickr.photos.search({
  //     tags: "Seattle"
  //   }, someCallback(error, flickr));
  // });
} 