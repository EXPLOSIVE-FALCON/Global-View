var queryGoogle = require('../apis/queryGoogle');
var queryInstagram = require('../apis/queryInstagram');
var queryTwitter = require('../apis/queryTwitter');

exports.google = function(req, res) {
  var query = req.query;
  query.amount = query.amount || 5;
  queryGoogle(query.query, query.location, query.amount, function(err, newsResults) {
    if (!!err) { throw 'Erorr: ' + err; }

    var sendBack = {
      result: 'Request Received!',
      data: newsResults
    };

    res.json(sendBack)
  });
};

exports.twitter = function(req, res) {
  var query = req.query;
  var response = {
    result: 'Request Received!',
    data: query
  };
  res.json(response);
};

exports.instagram = function(req, res) {
  var query = req.query;
  var response = {
    result: 'Request Received!',
    data: query
  };
  res.json(response);
};