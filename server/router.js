var helpers = require('./helpers/helpers');



exports.api = function(app) {

  app.get('/twitter', helpers.twitter);

  app.get('/googlenews', helpers.google);

  app.get('/instagram', helpers.instagram);
};