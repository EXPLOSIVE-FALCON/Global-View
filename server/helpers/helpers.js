/**
* @module helpers
*/
var queryGoogle = require('../apis/queryGoogle');
var queryInstagram = require('../apis/queryInstagram');
var queryTwitter = require('../apis/queryTwitter');

/**
* Receives GET requests from /api/google
* @function
* @memberof module:helpers
* @alias exports.google
* @param {object} req Request Parameter from GET Request
* @param {object} res Response Parameter from GET Request
* @returns {json} Sends Client a JSON Object containing an Array of Google News Stories
*/
exports.google = function(req, res) {
  var query = req.query;
  query.amount = query.amount || 5;
  queryGoogle(query.query, query.location, query.amount, function(err, newsResults) {
    if (!!err) { throw 'Error: ' + err; }

    var sendBack = {
      result: 'Request Received!',
      data: newsResults
    };

    res.json(sendBack)
  });
};

/**
* Receives GET requests from /api/twitter
* @function
* @memberof module:helpers
* @alias exports.twitter
* @param {object} req Request Parameter from GET Request
* @param {object} res Response Parameter from GET Request
* @returns {json} Sends Client a JSON Object containing an Array of Tweets
*/

exports.twitterTrendingCities = function(req,res){
  queryTwitter.getAvailableTrendingCities(function(err,trendingCities){
     if(!!err){ throw 'Error: '+ err;}
    var response = {
      status:200,
      result: 'Request Received!',
      data: trendingCities
    };  
    res.end(JSON.stringify(response));  
  });
};


exports.twitter = function(req, res) {
  var query = req.query;
  queryTwitter.getAvailableTrendingCities(function(err,trendingCities){
    if(!!err){ throw 'Error: '+ err;}
    var woeid = queryTwitter.getCityId(query,trendingCities);
    if(Array.isArray(woeid)){
      queryTwitter.getClosestTrendingCity(query,function(err,data){
        //console.log(data);
        if(!!err){ 'Error: ' + err;}
        queryTwitter.getTrendingTopics(data[0]['woeid'],function(err,trendingTopics){
          if(!!err){ throw 'Error: '+err;}
          queryTwitter.getTweetsForTrendObjects(trendingTopics,function(err,tweets){        
            var response = {
              status:200,
              result: 'Request Received!',
              data: tweets
            };
            res.end(JSON.stringify(response));      
          })
        }); 
      });
    }else{
        queryTwitter.getTrendingTopics(woeid,function(err,trendingTopics){
          if(!!err){ throw 'Error: '+err;}
          queryTwitter.getTweetsForTrendObjects(trendingTopics,function(err,tweets){        
            var response = {
              status:200,
              result: 'Request Received!',
              data: tweets
            };
            res.end(JSON.stringify(response));      
          })
        });      
    }
  });
  //queryTwitter.getTweet(queryObject, function(err, twitterResults){
};

/**
* Receives GET requests from /api/instagram
* @function
* @memberof module:helpers
* @alias exports.instagram
* @param {object} req Request Parameter from GET Request
* @param {object} res Response Parameter from GET Request
* @returns {json} Sends Client a JSON Object containing an Array of Instagram Photos
*/

exports.instagram = function(req, res) {
  var query = req.query;
  var qParams = {
    lat: query.lat,
    lng: query.lng,
    minDate: query.min_timestamp,
    maxDate: query.max_timestamp,
    distance: query.distance,
    query: query.query,
    callType: 'query' // 'query' OR 'location'
  };

     queryInstagram(qParams,function(err,photos) {
//   queryInstagram(query.lat,query.lng,query.min_timestamp,query.max_timestamp,query.distance,query.query,function(err,photos) {
    if(!!err) { throw 'Error: ' + err; }
    var response = {
      result: 'Request Received!',
      data: photos
    };
    res.json(response);
  });
};