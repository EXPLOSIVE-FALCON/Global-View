var google = require('../apis/google');
module.exports = function(app) {

  app.get('/twitter', function(req, res) {
    var query = req.query;
    var response = {
      response: 'Request Received!',
      results: query
    };
    res.json(response);
  });

  app.get('/news', function(req, res) {
    var query = req.query;
    var search = query.search + ' location:' + query.location;
    var resultAmt = query.amount || 5;
    google(search, resultAmt, function(err, newsResults) {
      if (!!err) { throw 'Erorr: ' + err; }

      var sendBack = {
        response: 'Request Received!',
        results: newsResults
      }

      res.json(sendBack)
    });
  });

  app.get('/instagram', function(req, res) {
    var query = req.query;
    var response = {
      response: 'Request Received!',
      results: query
    };
    res.json(response);
  }); 
};