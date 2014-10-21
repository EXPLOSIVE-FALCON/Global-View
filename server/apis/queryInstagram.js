/**
* @module queryInstagram
*/
var request = require('request');
var querystring = require('querystring');
var util = require('util');
var _ = require('lodash');
var instaKeys = require('../instaKeys');

/**
* instaSettings contains the various API endpoint URLs
* Currently using mediaGET for user requests that include latitude and longitude
* Requests with a place descriptor and no latitude longitude will use locationGET and photoGET
* @object
*/
var instaSettings = {
  headers: instaKeys.keys,
  mediaGET: 'https://api.instagram.com/v1/media/search',
  locationGET: 'https://api.instagram.com/v1/locations/search',
  photoGET: 'https://api.instagram.com/v1/locations/',
  photoGET2: '/media/recent'
};

var dayInMilliSeconds = 24 * 60 * 60 * 1000;

/**
* Direct query of instagram media using lat, lng co-ordinates and date/time range
* @function
* @memberof module:queryInstagram
* @param {number} lat Latitude of user input location
* @param {number} lng Longitude of user input location
* @param {number} minDate Beginning of date/time range input by user (in milliseconds)
* @param {number} maxDate End of date/time range input by user (in milliseconds)
* @param {number} distance Distance (measured in meters) from center of lat, lng co-ordinates that can return photos (default is 1000, if nothing is specified)
* @param {function} callback Callback function invoked on response results
*/
module.exports = function(lat, lng, minDate, maxDate, distance, callback) {
  minDate = Math.floor(minDate/1000);
  maxDate = Math.floor(maxDate/1000);
  var locationURL = instaSettings.mediaGET + '?access_token=%s&lat=%s&lng=%s&max_timestamp=%s&min_timestamp=%s&distance=%s';
  locationURL = util.format(locationURL, instaSettings.headers.instaToken, lat, lng, maxDate, minDate, distance);

  request(locationURL,function(error,res,body) {
    callback(error, sortByDistance(trimResponse(body), lat, lng));
  });
};

/**
* trimResponse cleans up the response from Instagram's API and removes extraneous data
* @function
* @param {object} body Object containing response from Instagram API call
*/
var trimResponse = function(body) {
  var results = JSON.parse(body);
  return _.map(results.data, function(item, index, collection) {
    delete item.attribution;
    delete item.comments;
    delete item.filter;
    delete item.likes.data;
    delete item.likes.users_in_photo;
    delete item.likes.user_has_liked;
    delete item.likes.user;
    delete item.users_in_photo;
    delete item.user_has_liked;

    if (item.caption) {
      delete item.caption.created_time;
      delete item.caption.from;
      delete item.caption.id;
    }
    return item;
  });
};

/**
* Calculate distance from lat/lng inputs in instaLocations
* @function
* @param {object} results Object containing response from Instagram API call (should already be pruned of non-essential key/value pairs
* @param {number} lat Latitude of user input location
* @param {number} lng Longitude of user input location
* @returns {array} Array containing a list of photos sorted by distance from query location
*/
var sortByDistance = function(results, lat, lng) {
  return _(results).map(function(item,index,collection) {
    var firstLocation = {
      lat: lat, 
      lng: lng
    };
    var secondLocation = {
      lat: item.location.latitude, 
      lng: item.location.longitude
    };

    return _.extend(item, { distance: distance(firstLocation, secondLocation) });
  }).sortBy('distance').valueOf();
};

/**
* Calculations from: http://stackoverflow.com/questions/7672759/how-to-calculate-distance-from-lat-long-in-php
* Helper function that calculates distance between two sets of lat/lng co-ordinates
* @function
* @param {object} loc1 Object containing lattitude, longitude of first location (lat, lng) 
* @param {object} loc2 Object containing lattitude, longitude of second location (lat, lng) 
* @returns {number} The distance between the first and second location
*/
var distance = function(loc1, loc2) {
  var longitudeDiff = loc1.lng - loc2.lng;
  var latitudeDiff = (Math.sin(degreeToRadian(loc1.lat)) * Math.sin(degreeToRadian(loc2.lat))) 
                   + (Math.cos(degreeToRadian(loc1.lat)) * Math.cos(degreeToRadian(loc2.lat)));

  var distance = degreeToRadian(Math.acos(longitudeDiff * Math.cos(degreeToRadian(latitudeDiff))));
  var distanceMiles = distance * 60 * 1.1515;
  return distance;
};

/**
* Calculations from: https://github.com/kvz/phpjs/blob/master/functions/math/deg2rad.js
* Helper function for distance function that converts degrees to randians
* @function
* @param {number} number
*/
var degreeToRadian = function(number) {
  return (number / 180) * Math.PI;
};
