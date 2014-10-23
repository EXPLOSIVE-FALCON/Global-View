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


exports.twitter = function(req, res) {
  var query = req.query;
  queryTwitter.getAvailableTrendingCities(function(tweetResults){
    console.log(tweetResults,' #####tweetResults');
    var response = {
      result: 'Request Received!',
      data: tweetResults
    };
    res.json(response);
    
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
  queryInstagram(query.lat,query.lng,query.min_timestamp,query.max_timestamp,query.distance,function(err,photos) {
    if(!!err) { throw 'Error: ' + err; }
    var response = {
      result: 'Request Received!',
      data: photos
    };
    res.json(response);
  });
};