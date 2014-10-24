/**
* @module queryTwitter
*/

var request = require('request');
var querystring = require('querystring');
var util = require('util');
var _ = require('lodash');
var path = require('path');
var twitterKeys = require('../twitterKeys');	
var Twit = require('twit');

var trendingPlaces ={
  obj:''
};

var T = new Twit({
  consumer_key :twitterKeys.consumerKey,
  consumer_secret: twitterKeys.consumerSecret,
  access_token: twitterKeys.accessToken,
  access_token_secret: twitterKeys.accessTokenSecret
});

var apiBase = 'https://api.twitter.com/';
var bearerToken = twitterKeys.consumerKey+':'+twitterKeys.consumerSecret;
var encodedString = new Buffer(bearerToken).toString('base64');
/**
*TESTING
*/
var testPlace =  { 'name': 'San Francisco' };

var options = {
  headers: {
    'Host' : 'api.twitter.com',
    'User-Agent': 'Vantage v.0.1',
    'Authorization' : 'Basic '+encodedString,
    'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Length': 29,
    'Accept-Encoding': 'gzip',
  }
};

module.exports.getAvailableTrendingCities = function(callback){
  T.get('trends/available',function(err, data, response){
    if(!!err){throw 'Error: ' + err;}
      callback(err,data);
  });

};
module.exports.getCityId = function(location,trendingCities){
  if(trendingCities === undefined || location === undefined){
    console.log('No results for city Id. In getCityId.');
  }else{
    var result = _.where(trendingCities,{ 'name': location });
    return result[0]['woeid'];
  }
};

module.exports.getTrendingTopics = function(woeid, callback){
  T.get('trends/place',{id:woeid},function(err,data,response){
    if(!!err){throw 'Error: ' + err;}
    var arrayOfTrends = data[0].trends;
    callback(err,arrayOfTrends);
  });
};

module.exports.getTweetsForTrendObjects = function(arrayOfTrends, callback){
  var results =[];
  _.map(arrayOfTrends,function(trend,index,arrayOfTrends){
    T.get('search/tweets', { q: trend['query'], count : 10}, function(err, data, response) { 
      if(!!err){throw 'Error: ' + err;}
      _.map(data.statuses,function(tweet,index,tweets){
       results.push(tweet); 
      });
     callback(err,results);
    });

  });
}