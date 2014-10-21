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
* Sample invocation of instaMedia
* instaMedia(37.77,-122.38,Date.now()-(5 * dayInMilliSeconds()),Date.now()-(5 * dayInMilliSeconds()),2000);
*/

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

