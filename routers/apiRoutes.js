var helpers = require('../helpers/helpers');
module.exports = function(app) {

  app.get('/twitter', helpers.twitter);

  app.get('/googlenews', helpers.google);

  app.get('/instagram', helpers.instagram);
};