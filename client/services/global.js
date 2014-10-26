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
      // street: request.street,
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
    console.log('got a request');
    Location.getLocation(request)
    .then(function(results){
      if(results){
        request.latitude = results.latitude;
        request.longitude = results.longitude;        
      }
      Twitter.getTweets(request)
      .then(function(data) {
        console.log(data.data);
        StoredData.tweets = data.data;
      });
    })
  };
  var getTrendingCities = function(){
    console.log('just got called');
    Twitter.getTrending()
    .then(function(results){
      console.log(results.data);
      StoredData.trendingCities = results;

    });
  };

  var getTrending = function(request) {

  };

  return {
    getPhotos: getPhotos,
    getTweets: getTweets,
    getNews: getNews,
    getTrendingCities: getTrendingCities
  };
});

var cityList = [
  {
    city: 'New Orleans',
    state: 'LA',
    img: 'new-orleans.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Francisco',
    state: 'CA',
    img: 'san-francisco.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'New York City',
    state: 'NY',
    img: 'new-york-city.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    img: 'los-angeles.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Minneapolis',
    state: 'MN',
    img: 'minneapolis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Washington D.C.',
    state: 'WASHINGTON DC',
    img: 'washington-dc.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Seattle',
    state: 'WA',
    img: 'seattle.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Antonio',
    state: 'TX',
    img: 'san-antonio.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Chicago',
    state: 'IL',
    img: 'chicago.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Miami',
    state: 'FL',
    img: 'miami.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Portland',
    state: 'OR',
    img: 'portland.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Austin',
    state: 'TX',
    img: 'austin.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Diego',
    state: 'CA',
    img: 'san-diego.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'St. Louis',
    state: 'MO',
    img: 'st-louis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Las Vegas',
    state: 'NV',
    img: 'las-vegas.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Denver',
    state: 'CO',
    img: 'denver.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'New Orleans',
    state: 'LA',
    img: 'new-orleans.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Francisco',
    state: 'CA',
    img: 'san-francisco.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'New York City',
    state: 'NY',
    img: 'new-york-city.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    img: 'los-angeles.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Minneapolis',
    state: 'MN',
    img: 'minneapolis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Washington D.C.',
    state: 'WASHINGTON DC',
    img: 'washington-dc.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Seattle',
    state: 'WA',
    img: 'seattle.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Antonio',
    state: 'TX',
    img: 'san-antonio.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Chicago',
    state: 'IL',
    img: 'chicago.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Miami',
    state: 'FL',
    img: 'miami.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Portland',
    state: 'OR',
    img: 'portland.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'Austin',
    state: 'TX',
    img: 'austin.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'San Diego',
    state: 'CA',
    img: 'san-diego.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  },
  {
    city: 'St. Louis', 
    state: 'MO',
    img: 'st-louis.png',
    trending: [{name: 'baseball'}, {name: 'ebola'}]
  }
];
