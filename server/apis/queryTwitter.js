/**
* @module queryTwitter
*/

var request = require('request');
var querystring = require('querystring');
var util = require('util');
var _ = require('lodash');
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

var getAvailableTrendingCities = function(callback){
  T.get('trends/available',function(err, data, response){
    if(!!err){throw 'Error: ' + err;}
      callback(err,data);
  });

};
var getClosestTrendingCity = function(query, callback){
  T.get('trends/closest',{lat: query.latitude, long: query.longitude },function(err,data,response){
    if(!!err) { throw 'Error: ' +err;}
    callback(err,data);
  });
};

var getCityId = function(query,trendingCities){
  if(trendingCities === undefined || query === undefined){
    console.log('No results for city Id. In getCityId.');
  }else{
    var result = _.where(trendingCities,{ 'name': query.city }); 
    if(result.length !== 0 ){
      return result[0]['woeid'];
    }
    return result;
  }
};

var getTrendingTopics = function(woeid, callback){
  T.get('trends/place',{id:woeid},function(err,data,response){
    if(!!err){throw 'Error: ' + err;}
    var arrayOfTrends = data[0].trends;
    callback(err,arrayOfTrends);
  });
};

var getTweetsForTrendObjects = function(arrayOfTrends, callback){
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

module.exports.getAvailableTrendingCities = getAvailableTrendingCities;
module.exports.getClosestTrendingCity = getClosestTrendingCity;
module.exports.getCityId = getCityId;
module.exports.getTrendingTopics = getTrendingTopics;
module.exports.getTweetsForTrendObjects = getTweetsForTrendObjects;