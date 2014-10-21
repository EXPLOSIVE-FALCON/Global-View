/**
* @module queryInstagram
*/
var request = require('request');
var querystring = require('querystring');
var util = require('util');
var _ = require('lodash');
var instaKeys = require('../instaKeys');

var instaSettings = {
  headers: instaKeys.keys,
  mediaGET: 'https://api.instagram.com/v1/media/search',
  locationGET: 'https://api.instagram.com/v1/locations/search',
  photoGET: 'https://api.instagram.com/v1/locations/',
  photoGET2: '/media/recent'

};

var dayInMilliSeconds = function() {
  return 24*60*60*1000;
};

/**
* direct query of instagram media using lat, lng co-ordinates
*/
module.exports = function(lat, lng, minDate, maxDate, distance, callback) {
  minDate = minDate/1000;
  maxDate = maxDate/1000;

  var locationURL = [instaSettings.mediaGET,'?','access_token=',instaSettings.headers.instaToken,'&lat=',lat,'&lng=',lng,'&max_timestamp=',maxDate,'&min_timestamp=',minDate,'&distance=',distance].join('').trim();

  request(locationURL,function(error,res,body) {
    callback(error,sortByDistance(trimResponse(body)));
  });
};

var trimResponse = function(body) {
  var results = JSON.parse(body);
  console.log(results);
  for(var i=0;i<results.length;i++) {
  /**
  * remove extraneous response data
  */
  delete results[i].data.attribution;
  delete results[i].data.comments;
  delete results[i].data.filter;
  delete results[i].data.likes.data;
  delete results[i].data.likes.users_in_photo;
  delete results[i].data.likes.user_has_liked;
  delete results[i].data.likes.user;
  delete results[i].data.caption.created_time;
  delete results[i].data.caption.from;
  delete results[i].data.caption.id;
  }
}

var sortByDistance = function(error,results) {

  if(!!error) {
    throw 'Error: ' + error;
  } else {
    /**
    * Calculate distance from lat/lng inputs in instaLocations
    */
    for(var i=0;i<results.data.length;i++) {
      results.data[i].distance = distanceBetween(lat, results.data[i].location.latitude, lng, results.data[i].location.longitude);
    }
    /**
    * sort data by distance
    */
    results.data = _.sortBy(results.data, 'distance');
    return results.data;
  }

}

/**
* Calculations from: http://stackoverflow.com/questions/7672759/how-to-calculate-distance-from-lat-long-in-php
*/
var distanceBetween = function(lat1, lat2, lng1, lng2) {
  var lngDifference = lng1 - lng2;
  var latDiffernce = (Math.sin(deg2radCalc(lat1)) * Math.sin(deg2radCalc(lat2))) + (Math.cos(deg2radCalc(lat1)) * Math.cos(deg2radCalc(lat2)));
  var distance = deg2radCalc(Math.acos(lngDifference * Math.cos(deg2radCalc(latDiffernce))));
  var distanceMiles = distance * 60 * 1.1515;

  return distance;

}

/**
* Calculations from: https://github.com/kvz/phpjs/blob/master/functions/math/deg2rad.js
*/
var deg2radCalc = function(number) {
  return (number / 180) * Math.PI;
}
