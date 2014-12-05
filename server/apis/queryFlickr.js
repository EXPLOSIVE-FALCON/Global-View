/**
* @module queryFlickr
*/
var request = require('request');
var util = require('util');
var _ = require('lodash');
var Flickr = require("flickrapi");
var flickrKeys = require('../config').flickr;
var URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=%s&text=%s&sort=interestingness-desc&per_page=1&format=json&nojsoncallback=1';

module.exports = function(city, callback) {
  var place = city + ' skyline';
  var site = util.format(URL, flickrKeys.api_key, place);

  request(site, callback);
};