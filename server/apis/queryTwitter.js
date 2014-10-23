/**
* @module queryTwitter
*/

var request = require('request');
var querystring = require('querystring');
var util = require('util');
var _ = require('lodash');
var path = require('path');
var twitterKeys = require('../twitterKeys');	
var twitterAPI = require('node-twitter-api');
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




var receiveTweets = function(req,res){
  console.log('receiveTweets was hit');
  console.dir(req);
};

module.exports.getAvailableTrendingCities = function(callback){
  T.get('trends/available',function(err,data,response){
    if(!!err){throw 'Error: ' + err;}
    trendingPlaces['places']=data;
    getCityId(callback);
    //search
    //console.dir(trendingPlaces);  
  });

};
var getCityId = function(callback){
  if(trendingPlaces['places'] === undefined){
    console.log('nothin there');
  }else{
    var result = _.where(trendingPlaces['places'],testPlace);
    var woeid = result[0]['woeid'];
    getTrendingTopics(callback,woeid);
  }
};

var getTrendingTopics = function(callback,woeid){
  T.get('trends/place',{id:woeid},function(err,data,response){
    if(!!err){throw 'Error: ' + err;}
    var arrayOfTrends = data[0].trends;
    getTweetsForTrendObjects(callback,arrayOfTrends);
  });
};

var getTweetsForTrendObjects = function(callback, arrayOfTrends){
  var results =[];
  _.map(arrayOfTrends,function(trend,index,arrayOfTrends){
    T.get('search/tweets', { q: trend['query'], count : 10}, function(err, data, response) { 
      if(!!err){throw 'Error: ' + err;}
      _.map(data.statuses,function(tweet,index,tweets){
       results.push(tweet); 
      });
     // process data
     // send res back with results array
    });  
    callback(results);
  });
}
  //*********************************
  // request.post({
  //   url: apiBase+'oauth2/token',
  //   headers : options.headers,
  //   body: 'grant_type=client_credentials'
  // },function(err,resp,body){
  //   if(!!err) {throw 'Erorr: ' + err;}
  //   console.log(resp.toJSON(),"RESPONSE OBJECT");
  //   console.log('#################', body);
  // });
/**********************************
 //  //receives a query params to build of query to send to twitter.
 // var bearerToken = new Buffer(twitter.consumerKey+':'+twitter.consumerSecret).toString('base64');
 // //console.log(options);
 // options['headers']['Authorization'] = "Basic "+bearerToken;  
 // request.post({
 //  headers: options.headers,
 //  url: options.url,
 //  body: 'grant_type=client_credentials'
 //  },function(error, response, body){
 //      if(!!error) { throw 'Error '+error; }
 //      var result = arguments[1].toJSON();
 //      console.log(result," RESULT");
 //    }
 //  );




* Makes a an async request to twitter API for a request token.
* @function
* @param callback(error, requestToken, requestTokenSecret,results)
* @returns {error}, {requestToken}, {requestTokenSecret},{results} 
*/
// twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
// 	debugger;
//   if (!!err) { throw 'Erorr: ' + err; } 
//   else {
// 	    //store token and tokenSecret somewhere, you'll need them later; redirect user
// 	}
// });


// twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
// if (error) {
//   console.log(error);
// }else {
// 	//store accessToken and accessTokenSecret somewhere (associated to the user)
// 	//Step 4: Verify Credentials belongs here
// 	}
// });

// twitter.verifyCredentials(accessToken, accessTokenSecret, function(error, data, response) {
// if (error) {
//   //something was wrong with either accessToken or accessTokenSecret
//   //start over with Step 1
// }else {
//   //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented)
//   //data contains the user-data described in the official Twitter-API-docs
//   //you could e.g. display his screen_name
//   console.log(data["screen_name"]);
// 	}
// });