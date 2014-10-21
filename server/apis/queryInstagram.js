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
*/
var instaSettings = {
  headers: instaKeys.keys,
  mediaGET: 'https://api.instagram.com/v1/media/search',
  locationGET: 'https://api.instagram.com/v1/locations/search',
  photoGET: 'https://api.instagram.com/v1/locations/',
  photoGET2: '/media/recent'
};

/**
* sample invocation of instamedia
* instaMedia(37,-122,Date.now()-(4*dayInMilliSeconds()),Date.now()-(2*dayInMilliSeconds()),1000,function(error,media) {
*  console.log('Response: ',media);
* });
*/

/**
* helper function to calculate a single day in milliseconds
*/
var dayInMilliSeconds = function() {
  return 24*60*60*1000;
};

/**
* direct query of instagram media using lat, lng co-ordinates
*/
module.exports = function(lat, lng, minDate, maxDate, distance, callback) {
/**
* converting minDate and maxDate from milliseconds to seconds to conform to Instagram API format
*/

  minDate = minDate/1000;
  maxDate = maxDate/1000;

/**
* locationURL constructs the request to Instagram's Media API endpoint using the access token associated with the Vantage app and user input
*/

  var locationURL = [instaSettings.mediaGET,'?','access_token=',instaSettings.headers.instaToken,'&lat=',lat,'&lng=',lng,'&max_timestamp=',maxDate,'&min_timestamp=',minDate,'&distance=',distance].join('').trim();

  request(locationURL,function(error,res,body) {
/**
* callback cleans up the response data and then sorts by proximity to user input latitude, longitude (in ascending order)
*/

    callback(error,sortByDistance(trimResponse(body),lat,lng));
  });
};



/**
* trimResponse cleans up the response from Instagram's API and removes extraneous data
*/
var trimResponse = function(body) {
  var results = JSON.parse(body);

  _(results.data).forEach(function(item,index,collection) {
    delete item.attribution;
    delete item.comments;
    delete item.filter;
    delete item.likes.data;
    delete item.likes.users_in_photo;
    delete item.likes.user_has_liked;
    delete item.likes.user;
    delete item.users_in_photo;
    delete item.user_has_liked;

    if(item.caption) {
     delete item.caption.created_time;
     delete item.caption.from;
     delete item.caption.id;
    }

  });

  return results;
}

/**
* Calculate distance from lat/lng inputs in instaLocations
*/
var sortByDistance = function(results,lat,lng) {
    _(results.data).forEach(function(item,index,collection) {
      item.distance = distanceBetween(lat, item.location.latitude, lng, item.location.longitude);
    });

    /**
    * sort data by distance
    */
    results.data = _.sortBy(results.data, 'distance');
    return results.data;
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
