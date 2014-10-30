var helpers = require('./helpers/helpers');

exports.apiRouter = function(app) {

  app.get('/twitter', helpers.twitter);

  app.get('/tweetPerTrend',helpers.tweetsForTrend);

  app.get('/twitterTrendingCities', helpers.twitterTrendingCities);

  app.get('/googlenews', helpers.google);

  app.get('/instagram', helpers.instagram);

  app.get('/flickr', helpers.flickr);
};