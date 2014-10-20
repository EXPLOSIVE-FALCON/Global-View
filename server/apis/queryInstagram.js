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
  locationGET: 'https://api.instagram.com/v1/locations/search',
  photoGET: 'https://api.instagram.com/v1/locations/',
  photoGET2: '/media/recent'

};

var instaLocations = function(lat,lng,perimeter) {
  var params = ['?','access_token=',instaSettings.headers.instaToken,'&','lat=',lat,'&','lng=',lng,'&','distance=',perimeter].join('').trim();
  var locationURL = util.format(instaSettings.locationGET + params);

  request(locationURL,function(err, res, body) {
    if (!!err) {
      throw 'Erorr: ' + err;
    } else {
      var results = JSON.parse(body);

      _.forEach(results.data, function(item) {

      });

      // Calculate distance from lat/lng inputs in instaLocations
      for(var i=0;i<results.data.length;i++) {
        results.data[i].distance = distanceBetween(lat, results.data[i].latitude, lng, results.data[i].longitude);
      }

      // sort data by distance
      results.data = _.sortBy(results.data, 'distance');

      // get photos from each location
      for(var j=0;j<results.data.length;j++) {
        instaPhotos(results.data[j].id);
      }
    }

  });

};

var instaPhotos = function(locationId) {
  var locationURL = [instaSettings.photoGET,locationId,instaSettings.photoGET2,'?','access_token=',instaSettings.headers.instaToken].join('').trim();

  request(locationURL,function(err,res,body) {
    if(!!err) {
      throw 'Error: ' + err;
    } else {
      var results = JSON.parse(body);
      console.log(results);
    }
  });
};

// Calculations from: http://stackoverflow.com/questions/7672759/how-to-calculate-distance-from-lat-long-in-php
var distanceBetween = function(lat1, lat2, lng1, lng2) {
  var lngDifference = lng1 - lng2;
  var latDiffernce = (Math.sin(deg2radCalc(lat1)) * Math.sin(deg2radCalc(lat2))) + (Math.cos(deg2radCalc(lat1)) * Math.cos(deg2radCalc(lat2)));
  var distance = deg2radCalc(Math.acos(lngDifference * Math.cos(deg2radCalc(latDiffernce))));
  var distanceMiles = distance * 60 * 1.1515;

  return distance;

}

// Calculations from: https://github.com/kvz/phpjs/blob/master/functions/math/deg2rad.js
var deg2radCalc = function(number) {
  return (number / 180) * Math.PI;
}

// sample invocation of instagram API
// instaLocations(34,-118,1000);