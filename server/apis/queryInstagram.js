/**
* @module queryInstagram
*/
var request = require('request');
var util = require('util');
var _ = require('lodash');
var instaKeys = require('../config').instagram;

/**
* instaSettings contains the various API endpoint URLs
* Requests in which allParameters.callType === 'query' use queryGET and queryGET2
* All other requests use mediaGET
* locationGET can be used to resolve a set of lat, lng coordinates to a placeID
* photoGET and photoGET2 can be used to retrieve a set of pictures that are associated with a placeID
* @object
*/
var instaSettings = {
  headers: instaKeys,
  queryGET: 'https://api.instagram.com/v1/tags/',
  queryGET2: '/media/recent',
  mediaGET: 'https://api.instagram.com/v1/media/search',
  locationGET: 'https://api.instagram.com/v1/locations/search',
  photoGET: 'https://api.instagram.com/v1/locations/',
  photoGET2: '/media/recent'
};

// amount of milliseconds in a day
var dayInMilliSeconds = 24 * 60 * 60 * 1000;

/**
* Direct query of instagram media using lat, lng co-ordinates and date/time range OR query string
* @function
* @memberof module:queryInstagram
* @param {object} allParameters Object of parameters passed in via query string.  May contain the following parameters (lat, lng, minDate, maxDate, query, distance, and callType)
* @param {function} callback Callback function invoked on response results
*/
module.exports = function(allParameters, callback) {
  var minDate = Math.floor(allParameters.minDate/1000) || Date.now() - dayInMilliSeconds;
  var maxDate = Math.floor(allParameters.maxDate/1000) || Date.now();
  var lat = parseFloat(allParameters.lat) || null;
  var lng = parseFloat(allParameters.lng) || null;
  var query = allParameters.query || 'null';
  query = query.replace(/#/g,'').split(' ').join('').toLowerCase();
  var distance = allParameters.distance || 1000;

  var requestURL;
  var sortParams=['tagMatch','distance'];

  if(allParameters.callType === 'query') {
    requestURL = instaSettings.queryGET + '%s' + instaSettings.queryGET2 + '?access_token=%s';
    requestURL = util.format(requestURL, query, instaSettings.headers.instaToken);
    sortParams = ['distance'];
  } else {
    requestURL = instaSettings.mediaGET + '?access_token=%s&lat=%s&lng=%s&max_timestamp=%s&min_timestamp=%s&distance=%s';
    requestURL = util.format(requestURL, instaSettings.headers.instaToken, lat, lng, maxDate, minDate, distance);
  }

  request(requestURL,function(error, res, body) {
    if(error) {
      console.log(error);
    } else {
      var results = JSON.parse(body);
      callback(error, sortResults(resultsDecorator(results.data,[
        trimResponse,
        applyTagFilter.bind(null,query),
        calculateDistance.bind(null,lat,lng)
        ]),sortParams));
    }
  });
};

/**
* Add new attributes to an object of photos
* @function
* @param {object} results Object containing data from Instagram response call
* @param {array} funcArray Array of functions that will add attributes to photoObj
* @returns {object} results Object containing data from Instagram response call and additional attributes appended
*/
var resultsDecorator = function(results, funcArray) {
  _(results).forEach(function(item) {
    _(funcArray).forEach(function(func) {
      func(item);
    });
  });
  return results;
};

/**
* trimResponse cleans up the response from Instagram's API and removes extraneous data
* @function
* @param {object} photoObj Object containing response (after invoking JSON.parse) from Instagram API call
* @returns {object} photoObj Object with attributes removed
*/
var trimResponse = function(photoObj) {
  delete photoObj.attribution;
  delete photoObj.comments;
  delete photoObj.filter;
  delete photoObj.likes.data;
  delete photoObj.likes.users_in_photo;
  delete photoObj.likes.user_has_liked;
  delete photoObj.likes.user;
  delete photoObj.users_in_photo;
  delete photoObj.user_has_liked;

  if (photoObj.caption) {
    delete photoObj.caption.created_time;
    delete photoObj.caption.from;
    delete photoObj.caption.id;
  }
  return photoObj;
};

/**
* Flag all results that have instagram hash tags that match (or partially match) the user's query string
* @function
* @param {string} query Query string corresponding to event (or trending topic)
* @param {object} results Object containing photo data from Instagram API call
* @returns {object} Object containing photo data with tagMatch attribute appended
*/
var applyTagFilter = function(query, photoObj) {
  var tagFound = 1;
  for(var i=0;i<photoObj.tags.length;i++) {
//     if(photoObj.tags[i].indexOf(inputParams.query) > -1) {
    if(photoObj.tags[i].indexOf(query) > -1) {
      tagFound = 0;
    }
  }
   _.extend(photoObj, {tagMatch: tagFound});
  return photoObj;
};

/**
* Calculate distance from lat/lng inputs in instaLocations
* @function
* @param {number} lat Latitude of event location
* @param {number} lng Longitude of event location
* @param {object} photoObj Object containing photo data from Instagram API call
* @returns {object} photoObj Object containing photo data with distance attribute appended - if photoObj.location is set to null, return value of 100,000 in order to sort it last
*/
var calculateDistance = function(lat, lng, photoObj) {
  if(photoObj.location === null || lat === undefined ||  lng === undefined) {
    _.extend(photoObj, { distance: 10000000 });
  } else {
    var firstLocation = {
      lat: lat,
      lng: lng
    };
    var secondLocation = {
      lat: photoObj.location.latitude,
      lng: photoObj.location.longitude
    };
    _.extend(photoObj, { distance: distance(firstLocation, secondLocation) });
  }

  return photoObj;
};

/**
* Calculate distance from lat/lng inputs in instaLocations
* @function
* @param {object} results Object containing response from Instagram API call with additional appended attributes (ex. tagMatch, distance)
* @param {array} parameters Array of sorting parameters in order of priority
* @returns {array} Array of results sorted by parameters
*/
var sortResults = function(results,parameters) {
  return _(results).sortBy(parameters).valueOf();
};

/**
* Derived from: http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
* Helper function that calculates distance between two sets of lat/lng co-ordinates
* @function
* @param {object} loc1 Object containing lattitude, longitude of first location (lat, lng)
* @param {object} loc2 Object containing lattitude, longitude of second location (lat, lng)
* @returns {number} distance The distance between the first and second location
*/
var distance = function(loc1, loc2) {
  var RADIUS = 6371;
  var lngDiff = degreeToRadian(loc1.lng - loc2.lng);
  var latDiff = degreeToRadian(loc1.lat - loc2.lat);
  var dist = Math.pow(Math.sin(latDiff/2),2) + (Math.cos(degreeToRadian(loc1.lat)) * Math.cos(degreeToRadian(loc2.lat))) * Math.pow(Math.sin(lngDiff/2),2);

  var distance = Math.atan(Math.sqrt(dist), Math.sqrt(1-dist)) * 2 * RADIUS;

  return distance;
};

/**
* Calculations from: https://github.com/kvz/phpjs/blob/master/functions/math/deg2rad.js
* Helper function for distance function that converts degrees to randians
* @function
* @param {number} number
* @returns {number} The input number, which had been expressed in degrees, converted to radians
*/
var degreeToRadian = function(number) {
  return (number / 180) * Math.PI;
};
