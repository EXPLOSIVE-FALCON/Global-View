/**
* @module queryFlickr
*/
var request = require('request');
var util = require('util');
var _ = require('lodash');
var Flickr = require("flickrapi");

if (process.env.ENVIRONMENT === 'PROD' || process.env.ENVIRONMENT === 'CI') {
  var flickrKeys = {
    api_key: process.env.flickrApiKey,
    secret: process.env.flickrSecret
  };
} else {
  var flickrKeys = require('../flickrKeys');
}

module.exports = function(city, someCallback) {


  var place = city + ' skyline';

  
var requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
flickrKeys.api_key + '&text=' + place + '&sort=interestingness-desc&per_page=1&format=json&nojsoncallback=1';

  
  request(requestURL, someCallback);
};



  

  
