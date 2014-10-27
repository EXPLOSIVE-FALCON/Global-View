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
  var queue = arrayOfTrends.slice(0),
      elem,
      results = [];

      (function iterate(){
        if(queue.length === 0){
          callback(null,results);
          return;
        }
        elem = queue.splice(0,1)[0];
        T.get('search/tweets', {q: elem['query'], count: 10}, function(err,data){
          if(!!err){throw 'Error: '+err;}
          results.push(data.statuses);
          process.nextTick(iterate);
        })
      })();
}

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
module.exports.getAvailableTrendingCities = getAvailableTrendingCities;
module.exports.getClosestTrendingCity = getClosestTrendingCity;
module.exports.getCityId = getCityId;
module.exports.getTrendingTopics = getTrendingTopics;
module.exports.getTweetsForTrendObjects = getTweetsForTrendObjects;