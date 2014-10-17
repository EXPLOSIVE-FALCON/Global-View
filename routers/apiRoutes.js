var helpers = require('../helpers/helpers');
module.exports = function(app) {

  app.get('/twitter', helpers.twitter);

  app.get('/news', helpers.google);

  app.get('/instagram', helpers.instagram);
};