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
    var response = {
      response: 'Request Received!',
      results: query
    };
    res.json(response);
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