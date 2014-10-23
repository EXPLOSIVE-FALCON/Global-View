angular.module('globalData', [])
.factory('StoredData', function() {
  var data = {
    news: [],
    photos: [],
    tweets: []
  };
  return {
    data: data
  };
});

angular.module('globalMethods', [
  'service_twitter', 
  'service_news', 
  'service_instagram', 
  'service_location'
  ])
.factory('GlobalMethods', function(GoogleNews, Instagram, Twitter, Location, StoredData) {
  var data = StoredData.data;
  var getNews = function(request) {
    GoogleNews.getNews(request)
      .then(function(result) {
        result.data.forEach(function(val, i) {
          data.news[i] = val;
        });
      });
  };
  var getPhotos = function(request) {
    var params = {
      street: request.street,
      city: request.city,
      state: request.state
    };
    Location.getLocation(params)
      .then(function(result) {
        var instaParams = {
          query: request.query,
          lat: result.latitude,
          lng: result.longitude,
          min_timestamp: +request.date,
          max_timestamp: moment(request.date).add(1, 'days').valueOf(),
          distance: 1000,
          amount: 8 //!!! need to change it when we get scrolling
        };
        Instagram.getPhotos(instaParams)
          .then(function(result) {
            result.data.forEach(function(val, i) {
              data.photos[i] = val;
            })
          });
      });
  };
  var getTweets = function(request) {
    // Twitter.getTweets(request)
    //   .then(function(data) {
    //     $scope.data = data;
    //     console.log('scope Cntrl', $scope.data);
    //   })
  };

  return {
    getPhotos: getPhotos,
    getTweets: getTweets,
    getNews: getNews
  };
});