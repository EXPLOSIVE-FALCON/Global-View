var request = require('request');
var querystring = require('querystring');
var util = require('util');

console.log(request);
/*
Instagram API
Client ID: c46551123e2f42ef95d857356a7ff0b6
Client Secret: cb6edb6450e4400b9984f09877824330
*/

/* Sample GET Request URLS for Locations and Photos, respectively
https://api.instagram.com/v1/locations/search?lat=34&lng=-118&distance=1000
https://api.instagram.com/v1/locations/19440498/media/recent?min_timestamp=1413061158101&max_timestamp=1413493114700
 */

var instaSettings = {
  headers: {
    instaClientID: 'c46551123e2f42ef95d857356a7ff0b6',
    instaClientKey: 'cb6edb6450e4400b9984f09877824330'
  },
  locationGET: 'https://api.instagram.com/v1/locations/search',
  photoGET: 'https://api.instagram.com/v1/locations/',
  photGET2: '/media/recent?'

};

// 'access_token=',instaSettings.headers.instaClientID,'&',


var instaLocations = function(lat,lng,perimeter) {
  var params = ['?','lat=',lat,'&','lng=',lng,'&','distance=',perimeter].join('').trim();
  console.log(instaSettings.locationGET + params);
/*   console.log(params); */

  var locationURL = util.format(instaSettings.locationGET + params);
  console.log(locationURL);

  request(locationURL,function(err, res, body) {
    if (!!err) { throw 'Erorr: ' + err; }
    console.log('hi');
    console.log(res);

  });

};

instaLocations(34,-118,1000);


var instaPhotos = function(locationId) {

};

