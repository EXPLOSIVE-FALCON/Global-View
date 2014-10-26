/*
*  Global Data Stores all Tweets, News, and Photos
*/
angular.module('globalData', [])
.factory('StoredData', function() {
  // var data = {
  //   news: [],
  //   photos: [],
  //   tweets: []
  // };
  return {
    news: [],
    photos: [],
    cities: cityList,
    tweets: []
  };
  // return {
  //   data: data
  // };
});

/*
*  GlobalMethods stores all functionality that can change global Data
*/
angular.module('globalMethods', [
  'service_twitter', 
  'service_news', 
  'service_instagram', 
  'service_location'
])
.factory('GlobalMethods', function(GoogleNews, Instagram, Twitter, Location, StoredData) {
  var getNews = function(request) {
    GoogleNews.getNews(request)
      .then(function(result) {
        StoredData.news = result.data;
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
            StoredData.photos = result.data;
          });
      });
  };

  var getTweets = function(request) {
    Location.getLocation(request)
    .then(function(results){
      if(results){
        request.latitude = results.latitude;
        request.longitude = results.longitude;        
      }
      Twitter.getTweets(request)
      .then(function(data) {
        StoredData.tweets = data;
      });
    })
  };

  var getTrending = function(request) {

  };

  return {
    getPhotos: getPhotos,
    getTweets: getTweets,
    getTrending: getTrending,
    getNews: getNews
  };
});

var cityList = [
  {
    city: 'New Orleans',
    img: 'new-orleans.png',
    trending: []
  },
  {
    city: 'San Francisco',
    img: 'san-francisco.png',
    trending: []
  },
  {
    city: 'New York City',
    img: 'new-york-city.png',
    trending: []
  },
  {
    city: 'Los Angeles',
    img: 'los-angeles.png',
    trending: []
  },
  {
    city: 'Minneapolis',
    img: 'minneapolis.png',
    trending: []
  },
  {
    city: 'Washington D.C.',
    img: 'washington-dc.png',
    trending: []
  },
  {
    city: 'Seattle',
    img: 'seattle.png',
    trending: []
  },
  {
    city: 'San Antonio',
    img: 'san-antonio.png',
    trending: []
  },
  {
    city: 'Chicago',
    img: 'chicago.png',
    trending: []
  },
  {
    city: 'Miami',
    img: 'miami.png',
    trending: []
  },
  {
    city: 'Portland',
    img: 'portland.png',
    trending: []
  },
  {
    city: 'Austin',
    img: 'austin.png',
    trending: []
  },
  {
    city: 'San Diego',
    img: 'san-diego.png',
    trending: []
  },
  {
    city: 'St. Louis', 
    img: 'st-louis.png'
  },
  {
    city: 'Las Vegas',
    img: 'las-vegas.png',
    trending: []
  },
  {
    city: 'Denver',
    img: 'denver.png',
    trending: []
  },
  {
    city: 'New Orleans',
    img: 'new-orleans.png',
    trending: []
  },
  {
    city: 'San Francisco',
    img: 'san-francisco.png',
    trending: []
  },
  {
    city: 'New York City',
    img: 'new-york-city.png',
    trending: []
  },
  {
    city: 'Los Angeles',
    img: 'los-angeles.png',
    trending: []
  },
  {
    city: 'Minneapolis',
    img: 'minneapolis.png',
    trending: []
  },
  {
    city: 'Washington D.C.',
    img: 'washington-dc.png',
    trending: []
  },
  {
    city: 'Seattle',
    img: 'seattle.png',
    trending: []
  },
  {
    city: 'San Antonio',
    img: 'san-antonio.png',
    trending: []
  },
  {
    city: 'Chicago',
    img: 'chicago.png',
    trending: []
  },
  {
    city: 'Miami',
    img: 'miami.png',
    trending: []
  },
  {
    city: 'Portland',
    img: 'portland.png',
    trending: []
  },
  {
    city: 'Austin',
    img: 'austin.png',
    trending: []
  },
  {
    city: 'San Diego',
    img: 'san-diego.png',
    trending: []
  },
  {
    city: 'St. Louis', 
    img: 'st-louis.png',
    trending: []
  }
];