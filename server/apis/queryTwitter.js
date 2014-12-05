/**
* @module queryTwitter
*/
var request = require('request');
var querystring = require('querystring');
var util = require('util');
var _ = require('lodash');
var Twit = require('twit');
var twitterKeys = require('../config').twitter;

var trendingPlaces = {
  obj: ''
};

/**
* T is an instance of Twit
* T contains the app-specific authorization keys
* @object
*/
var T = new Twit({
  consumer_key :twitterKeys.consumerKey,
  consumer_secret: twitterKeys.consumerSecret,
  access_token: twitterKeys.accessToken,
  access_token_secret: twitterKeys.accessTokenSecret
});

/**
* retrieves available trending cities from Twitter API
* @param {function} callback Function called when data is returned
* @function
*/
var getAvailableTrendingCities = function(callback) {
  T.get('trends/available',function(err, data, response) {
    if (Boolean(err)) { throw 'Error: ' + err; }
      callback(err,data);
  });
};

/**
* retrieves trends from Twitter API from closest city to latitude/longitued co-ordinates
* @param {object} query String of parameters (latitude and longitude are used for this function)
* @param {function} callback Function called when data is returned
* @function
*/
var getClosestTrendingCity = function(query, callback) {
  T.get('trends/closest',{lat: query.latitude, long: query.longitude },function(err,data,response) {
    if (Boolean(err)) { throw 'Error: ' +err; }
    callback(err,data);
  });
};

/**
* retrieves city ID from Twitter API
* @param {object} query String of parameters (city is used for this function)
* @param {object} trendingCities Object with list of trending cities from Twitter API
* @function
*/
var getCityId = function(query,trendingCities){
  if (trendingCities === undefined || query === undefined) {
    console.log('No results for city Id. In getCityId.');
  }else{
    var result = _.where(trendingCities,{ 'name': query.city });
    if (result.length !== 0) {
      return result[0].woeid;
    }
    return result;
  }
};

/**
* retrieves trending topics of a certain city from Twitter API
* @param {object} woeid Twitter's city ID
* @param {function} callback Function called when data is returned
* @function
*/
var getTrendingTopics = function(woeid, callback){
  T.get('trends/place',{id:woeid},function(err,data,response) {
    if(Boolean(err)) { throw 'Error: ' + err; }
    var arrayOfTrends = data[0].trends;
    callback(err,arrayOfTrends);
  });
};

/**
* retrieves tweets for trending topics from Twitter API
* @param {array} arrayOfTrends Array of trending topics
* @param {function} callback Function called when data is returned
* @function
*/
var getTweetsForTrendObjects = function(arrayOfTrends, callback) {
  var queue = arrayOfTrends.slice(0),
      elem,
      results = [];

      (function iterate(){
        if(queue.length === 0){
          callback(null,results);
          return;
        }
        elem = queue.splice(0,1)[0];
        T.get('search/tweets', {q: elem.query, count: 10}, function(err,data) {
          if(Boolean(err)) { throw 'Error: '+err; }
          results.push(data.statuses);
          process.nextTick(iterate);
        });
      })();
};

// var getTweetsPerTrendingItem = function(counter){
//     var counter = counter || 0;
//     //termination condition
//     console.log("entered into getTweetsPerTrendingItem");
//     if( counter === arrayOfTrends.length){
//       console.log(results);
//       return;
//     }
//     _.map(arrayOfTrends,function(trend,index,arrayOfTrends){
//       console.log(trend, ":: is the trend");
//       T.get('search/tweets', { q: trend['query'], count : 10}, function(err, data, response) {
//         console.log(data," :: should be twitter info ");
//         if(!!err){throw 'Error: ' + err;}
//         result.push(data.statuses);
//         // _.map(data.statuses,function(tweet,index,tweets){
//         //  results.push(tweet);
//         // });
//       });
//     });
//     getTweetsPerTrendingItem(counter+1);
//   }
//   getTweetsPerTrendingItem(0);
//   callback(results);

module.exports = {
  getAvailableTrendingCities: getAvailableTrendingCities,
  getClosestTrendingCity: getClosestTrendingCity,
  getCityId: getCityId,
  getTrendingTopics: getTrendingTopics,
  getTweetsForTrendObjects: getTweetsForTrendObjects
};