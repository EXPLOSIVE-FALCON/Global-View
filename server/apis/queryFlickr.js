/**
* @module queryFlickr
*/
var request = require('request');
var util = require('util');
var _ = require('lodash');
var flickrKeys = require('../flickrKeys');
var Flickr = require("flickrapi");


module.exports = function(city, someCallback) {


  var place = city + ' skyline';

  
var requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
flickrKeys.api_key + '&text=' + place + '&sort=interestingness-desc&per_page=1&format=json&nojsoncallback=1';

  
  request(requestURL, someCallback);
};



  

  
