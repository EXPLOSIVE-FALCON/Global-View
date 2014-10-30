
angular.module('storedData', [])
.factory('StoredData', function() {
  /**
  * @class AngularModule_Factories.StoredData 
  * @memberof AngularModule_Factories
  * @description Angular Factory: This module stores all data used accross the application.
  * @property {array} news Contains a list of Objects containing news stories
  * @property {array} photos Contains a list of Objects containing instagram photos
  * @property {object} currentCity Contains information about selected city
  * @property {array} currentTrends Contains a list of objects containing trending topics
  * @property {array} cities Contains a list of city objects with trending topics
  * @property {array} tweets Contains a list tweets objects from twitter api
  */
  return {
    news: [],
    photos: [],
    currentCity: {},
    currentTrends: [],
    cities: cityList,
    tweets: [], 
    cityImages: []
  };
});

angular.module('globalMethods', [
  'twitter', 
  'googleNews', 
  'instagram', 
  'location',
  'flickr'
])

.factory('GlobalMethods', function(GoogleNews, Instagram, Twitter, Location, StoredData, Flickr) {
  /**
  * @function
  * @memberof AngularModule_Factories.GlobalMethods
  * @description This function accesses the news angular modular to get news and stores the results in [StoredData]{@link AngularModule_Factories.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  */
  
  var getNews = function(request) {
    GoogleNews.getNews(request)
      .then(function(result) {
        StoredData.news = result;
      });
  };

  /**
  * @function
  * @memberof AngularModule_Factories.GlobalMethods
  * @description This function accesses the photos angular modular to get instagram photos and stores the results in [StoredData]{@link AngularModule_Factories.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  */
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
          min_timestamp: result.min_timestamp || +request.date,
          max_timestamp: result.max_timestamp || moment(request.date).add(1, 'days').valueOf(),
          distance: 1000,
          amount: 8 //!!! need to change it when we get scrolling
        };
        Instagram.getPhotos(instaParams)
          .then(function(result) {
            StoredData.photos = result;
          });
      });
  };

  /**
  * @function
  * @memberof AngularModule_Factories.GlobalMethods
  * @description This function accesses the tweets angular modular to get tweets on a specific trending topic and stores the results in [StoredData]{@link AngularModule_Factories.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  */
  var getTweets = function(request) {
    console.log('got a request');
    Location.getLocation(request)
    .then(function(results) {
      if (results){
        request.latitude = results.latitude;
        request.longitude = results.longitude;
      }
      Twitter.getTweets(request)
      .then(function(data) {
        StoredData.tweets = data;
      });
    });
  };
  /**
  * @function
  * @memberof AngularModule_Factories.GlobalMethods
  * @description Note: No Arguments. Function Calls Server and retrieves a list of cities and trending topics for those cities. WIP. Stores the results in [StoredData]{@link AngularModule_Factories.StoredData}
  */
  var getTrendingCities = function() {
    console.log('just got called');
    Twitter.getTrending()
    .then(function(results) {
      StoredData.trendingCities = results;
    });
  };

  /**
  * @function
  * @memberof AngularModule_Factories.GlobalMethods
  * @description This function calls accesses the news angular modular to get news and return the news to [StoredData]{@link AngularModule_Factories.StoredData}
  * @param {object} request Request object for request
  * @param {string} request.city Name of City
  * @param {string} request.state Abbreviation of State
  * @param {date} request.date Current Time in UTC
  * @param {string} request.query Search Query for Services
  */
  var setCity = function(request) {
    StoredData.currentCity = request;
    var trend = _.find(StoredData.cities, function(val, index) {
      return val.city === request.city;
    });

    StoredData.currentTrends = trend.trending;
  };


  var setCityImages = function(request) {
    // console.log("1: GLOBAL REQUEST", request);

    Flickr.setCityImages()
    .then(function(results){
      StoredData.cityImages.push(results);
      var body = JSON.parse(results.data.data.body);
      // console.log("5: STORED DATA", body.photos.photo[0]);


      //farm-id: .farm
      //server-id: .server
      //id: .id
      //secret: .secret

      //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg


    });

  };


  /**
  * @class AngularModule_Factories.GlobalMethods 
  * @description Angular Factory: Stores all functionality that can change StoredData
  * @memberof AngularModule_Factories
  * @property {function} getPhotos Gets Photos for Selected City and Stores the result in [StoredData]{@link AngularModule_Factories.StoredData}
  * @property {function} getTweets Gets Tweets for Selected City and Stores the result in [StoredData]{@link AngularModule_Factories.StoredData} 
  * @property {function} getNews Gets News Results for Selected City and Stores the result in [StoredData]{@link AngularModule_Factories.StoredData}
  * @property {function} getTrendingCities Gets Trending Topics From list of Cities and Stores the result in [StoredData]{@link AngularModule_Factories.StoredData}
  * @property {function} setCity Contains a list of city objects with trending topic and Stores the result in [StoredData]{@link AngularModule_Factories.StoredData}
  */
  return {
    getPhotos: getPhotos,
    getTweets: getTweets,
    getNews: getNews,
    getTrendingCities: getTrendingCities,
    setCity: setCity,
    setCityImages: setCityImages
  };
});

// list is currently hard coded because of rate limiting from twitter api
// could be resolved by using a database to cache results
var cityList = [
  {
    city: 'New Orleans',
    state: 'LA',
    img: 'new-orleans.png',
    trending: [
      {
        "name": "Saints",
        "query": "Saints",
        "url": "http://twitter.com/search?q=Saints",
        "promoted_content": null
      },
      {
        "name": "Bo Wallace",
        "query": "%22Bo+Wallace%22",
        "url": "http://twitter.com/search?q=%22Bo+Wallace%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      },
      {
        "name": "#LSUvsMISS",
        "query": "%23LSUvsMISS",
        "url": "http://twitter.com/search?q=%23LSUvsMISS",
        "promoted_content": null
      },
      {
        "name": "#GeauxTigers",
        "query": "%23GeauxTigers",
        "url": "http://twitter.com/search?q=%23GeauxTigers",
        "promoted_content": null
      },
      {
        "name": "Waffle House",
        "query": "%22Waffle+House%22",
        "url": "http://twitter.com/search?q=%22Waffle+House%22",
        "promoted_content": null
      },
      {
        "name": "New Orleans",
        "query": "%22New+Orleans%22",
        "url": "http://twitter.com/search?q=%22New+Orleans%22",
        "promoted_content": null
      },
      {
        "name": "The NFC South",
        "query": "%22The+NFC+South%22",
        "url": "http://twitter.com/search?q=%22The+NFC+South%22",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'San Francisco',
    state: 'CA',
    img: 'san-francisco.png',
    trending: [
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null,
        "lat": 37.77,
        "lng": -122.38,
        "min_timestamp": 1414364385197,
        "max_timestamp": 1414407655556,
        "callType": "location"
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "#SEAvsCAR",
        "query": "%23SEAvsCAR",
        "url": "http://twitter.com/search?q=%23SEAvsCAR",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Van Persie",
        "query": "%22Van+Persie%22",
        "url": "http://twitter.com/search?q=%22Van+Persie%22",
        "promoted_content": null
      },
      {
        "name": "Giants",
        "query": "Giants",
        "url": "http://twitter.com/search?q=Giants",
        "promoted_content": null
      },
      {
        "name": "#ColleensCorner",
        "query": "%23ColleensCorner",
        "url": "http://twitter.com/search?q=%23ColleensCorner",
        "promoted_content": null
      },
      {
        "name": "Schaub",
        "query": "Schaub",
        "url": "http://twitter.com/search?q=Schaub",
        "promoted_content": null
      },
      {
        "name": "Petit",
        "query": "Petit",
        "url": "http://twitter.com/search?q=Petit",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'New York',
    state: 'NY',
    img: 'new-york-city.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#BUFvsNYJ",
        "query": "%23BUFvsNYJ",
        "url": "http://twitter.com/search?q=%23BUFvsNYJ",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "#JetsvsBills",
        "query": "%23JetsvsBills",
        "url": "http://twitter.com/search?q=%23JetsvsBills",
        "promoted_content": null
      },
      {
        "name": "Lamarr Houston",
        "query": "%22Lamarr+Houston%22",
        "url": "http://twitter.com/search?q=%22Lamarr+Houston%22",
        "promoted_content": null
      },
      {
        "name": "Nick Folk",
        "query": "%22Nick+Folk%22",
        "url": "http://twitter.com/search?q=%22Nick+Folk%22",
        "promoted_content": null
      },
      {
        "name": "#Steelers",
        "query": "%23Steelers",
        "url": "http://twitter.com/search?q=%23Steelers",
        "promoted_content": null
      },
      {
        "name": "John Brown",
        "query": "%22John+Brown%22",
        "url": "http://twitter.com/search?q=%22John+Brown%22",
        "promoted_content": null
      },
      {
        "name": "Matt Simms",
        "query": "%22Matt+Simms%22",
        "url": "http://twitter.com/search?q=%22Matt+Simms%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    img: 'los-angeles.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "#LetUsIn",
        "query": "%23LetUsIn",
        "url": "http://twitter.com/search?q=%23LetUsIn",
        "promoted_content": null
      },
      {
        "name": "#kings1",
        "query": "%23kings1",
        "url": "http://twitter.com/search?q=%23kings1",
        "promoted_content": null
      },
      {
        "name": "#SEAvsCAR",
        "query": "%23SEAvsCAR",
        "url": "http://twitter.com/search?q=%23SEAvsCAR",
        "promoted_content": null
      },
      {
        "name": "Kelvin Benjamin",
        "query": "%22Kelvin+Benjamin%22",
        "url": "http://twitter.com/search?q=%22Kelvin+Benjamin%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "John Brown",
        "query": "%22John+Brown%22",
        "url": "http://twitter.com/search?q=%22John+Brown%22",
        "promoted_content": null
      },
      {
        "name": "Van Persie",
        "query": "%22Van+Persie%22",
        "url": "http://twitter.com/search?q=%22Van+Persie%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Minneapolis',
    state: 'MN',
    img: 'minneapolis.png',
    trending: [
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Jennings",
        "query": "Jennings",
        "url": "http://twitter.com/search?q=Jennings",
        "promoted_content": null
      },
      {
        "name": "Vikings",
        "query": "Vikings",
        "url": "http://twitter.com/search?q=Vikings",
        "promoted_content": null
      },
      {
        "name": "Tampa Bay",
        "query": "%22Tampa+Bay%22",
        "url": "http://twitter.com/search?q=%22Tampa+Bay%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#DETvsATL",
        "query": "%23DETvsATL",
        "url": "http://twitter.com/search?q=%23DETvsATL",
        "promoted_content": null
      },
      {
        "name": "Gronk",
        "query": "Gronk",
        "url": "http://twitter.com/search?q=Gronk",
        "promoted_content": null
      },
      {
        "name": "#SKOL",
        "query": "%23SKOL",
        "url": "http://twitter.com/search?q=%23SKOL",
        "promoted_content": null
      },
      {
        "name": "Everson Griffen",
        "query": "%22Everson+Griffen%22",
        "url": "http://twitter.com/search?q=%22Everson+Griffen%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Washington D.C.',
    state: 'WASHINGTON DC',
    img: 'washington-dc.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#BALvsCIN",
        "query": "%23BALvsCIN",
        "url": "http://twitter.com/search?q=%23BALvsCIN",
        "promoted_content": null
      },
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "Ravens",
        "query": "Ravens",
        "url": "http://twitter.com/search?q=Ravens",
        "promoted_content": null
      },
      {
        "name": "#DETvsATL",
        "query": "%23DETvsATL",
        "url": "http://twitter.com/search?q=%23DETvsATL",
        "promoted_content": null
      },
      {
        "name": "#BUFvsNYJ",
        "query": "%23BUFvsNYJ",
        "url": "http://twitter.com/search?q=%23BUFvsNYJ",
        "promoted_content": null
      },
      {
        "name": "Gronk",
        "query": "Gronk",
        "url": "http://twitter.com/search?q=Gronk",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Van Persie",
        "query": "%22Van+Persie%22",
        "url": "http://twitter.com/search?q=%22Van+Persie%22",
        "promoted_content": null
      },
      {
        "name": "Geno Smith",
        "query": "%22Geno+Smith%22",
        "url": "http://twitter.com/search?q=%22Geno+Smith%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Seattle',
    state: 'WA',
    img: 'seattle.png',
    trending: [
      {
        "name": "#SEAvsCAR",
        "query": "%23SEAvsCAR",
        "url": "http://twitter.com/search?q=%23SEAvsCAR",
        "promoted_content": null
      },
      {
        "name": "Cam Newton",
        "query": "%22Cam+Newton%22",
        "url": "http://twitter.com/search?q=%22Cam+Newton%22",
        "promoted_content": null
      },
      {
        "name": "#GoHawks",
        "query": "%23GoHawks",
        "url": "http://twitter.com/search?q=%23GoHawks",
        "promoted_content": null
      },
      {
        "name": "The Steelers",
        "query": "%22The+Steelers%22",
        "url": "http://twitter.com/search?q=%22The+Steelers%22",
        "promoted_content": null
      },
      {
        "name": "Carolina",
        "query": "Carolina",
        "url": "http://twitter.com/search?q=Carolina",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Bruce Irvin",
        "query": "%22Bruce+Irvin%22",
        "url": "http://twitter.com/search?q=%22Bruce+Irvin%22",
        "promoted_content": null
      },
      {
        "name": "#BALvsCIN",
        "query": "%23BALvsCIN",
        "url": "http://twitter.com/search?q=%23BALvsCIN",
        "promoted_content": null
      },
      {
        "name": "Kelvin Benjamin",
        "query": "%22Kelvin+Benjamin%22",
        "url": "http://twitter.com/search?q=%22Kelvin+Benjamin%22",
        "promoted_content": null
      },
      {
        "name": "Hauschka",
        "query": "Hauschka",
        "url": "http://twitter.com/search?q=Hauschka",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'San Antonio',
    state: 'TX',
    img: 'san-antonio.png',
    trending: [
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "San Antonio",
        "query": "%22San+Antonio%22",
        "url": "http://twitter.com/search?q=%22San+Antonio%22",
        "promoted_content": null
      },
      {
        "name": "Texas",
        "query": "Texas",
        "url": "http://twitter.com/search?q=Texas",
        "promoted_content": null
      },
      {
        "name": "UTEP",
        "query": "UTEP",
        "url": "http://twitter.com/search?q=UTEP",
        "promoted_content": null
      },
      {
        "name": "Geno Smith",
        "query": "%22Geno+Smith%22",
        "url": "http://twitter.com/search?q=%22Geno+Smith%22",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      },
      {
        "name": "UTSA",
        "query": "UTSA",
        "url": "http://twitter.com/search?q=UTSA",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Warren",
        "query": "Warren",
        "url": "http://twitter.com/search?q=Warren",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Chicago',
    state: 'IL',
    img: 'chicago.png',
    trending: [
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "Lamar Houston",
        "query": "%22Lamar+Houston%22",
        "url": "http://twitter.com/search?q=%22Lamar+Houston%22",
        "promoted_content": null
      },
      {
        "name": "#BearsvsPats",
        "query": "%23BearsvsPats",
        "url": "http://twitter.com/search?q=%23BearsvsPats",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Gronk",
        "query": "Gronk",
        "url": "http://twitter.com/search?q=Gronk",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Cutler",
        "query": "Cutler",
        "url": "http://twitter.com/search?q=Cutler",
        "promoted_content": null
      },
      {
        "name": "Down 25",
        "query": "%22Down+25%22",
        "url": "http://twitter.com/search?q=%22Down+25%22",
        "promoted_content": null
      },
      {
        "name": "Bennett",
        "query": "Bennett",
        "url": "http://twitter.com/search?q=Bennett",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Miami',
    state: 'FL',
    img: 'miami.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#MIAvsJAX",
        "query": "%23MIAvsJAX",
        "url": "http://twitter.com/search?q=%23MIAvsJAX",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Blake Bortles",
        "query": "%22Blake+Bortles%22",
        "url": "http://twitter.com/search?q=%22Blake+Bortles%22",
        "promoted_content": null
      },
      {
        "name": "Dolphins",
        "query": "Dolphins",
        "url": "http://twitter.com/search?q=Dolphins",
        "promoted_content": null
      },
      {
        "name": "Brent Grimes",
        "query": "%22Brent+Grimes%22",
        "url": "http://twitter.com/search?q=%22Brent+Grimes%22",
        "promoted_content": null
      },
      {
        "name": "Miami",
        "query": "Miami",
        "url": "http://twitter.com/search?q=Miami",
        "promoted_content": null
      },
      {
        "name": "Pick 6",
        "query": "%22Pick+6%22",
        "url": "http://twitter.com/search?q=%22Pick+6%22",
        "promoted_content": null
      },
      {
        "name": "Geno",
        "query": "Geno",
        "url": "http://twitter.com/search?q=Geno",
        "promoted_content": null
      },
      {
        "name": "#LifeYouWantMIA",
        "query": "%23LifeYouWantMIA",
        "url": "http://twitter.com/search?q=%23LifeYouWantMIA",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Portland',
    state: 'OR',
    img: 'portland.png',
    trending: [
      {
        "name": "#SEAvsCAR",
        "query": "%23SEAvsCAR",
        "url": "http://twitter.com/search?q=%23SEAvsCAR",
        "promoted_content": null
      },
      {
        "name": "#RCTID",
        "query": "%23RCTID",
        "url": "http://twitter.com/search?q=%23RCTID",
        "promoted_content": null
      },
      {
        "name": "Kelvin Benjamin",
        "query": "%22Kelvin+Benjamin%22",
        "url": "http://twitter.com/search?q=%22Kelvin+Benjamin%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Portland",
        "query": "Portland",
        "url": "http://twitter.com/search?q=Portland",
        "promoted_content": null
      },
      {
        "name": "Oregon",
        "query": "Oregon",
        "url": "http://twitter.com/search?q=Oregon",
        "promoted_content": null
      },
      {
        "name": "#GoHawks",
        "query": "%23GoHawks",
        "url": "http://twitter.com/search?q=%23GoHawks",
        "promoted_content": null
      },
      {
        "name": "Timbers",
        "query": "Timbers",
        "url": "http://twitter.com/search?q=Timbers",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Austin',
    state: 'TX',
    img: 'austin.png',
    trending: [
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Bo Wallace",
        "query": "%22Bo+Wallace%22",
        "url": "http://twitter.com/search?q=%22Bo+Wallace%22",
        "promoted_content": null
      },
      {
        "name": "Texas",
        "query": "Texas",
        "url": "http://twitter.com/search?q=Texas",
        "promoted_content": null
      },
      {
        "name": "Steelers",
        "query": "Steelers",
        "url": "http://twitter.com/search?q=Steelers",
        "promoted_content": null
      },
      {
        "name": "Vick",
        "query": "Vick",
        "url": "http://twitter.com/search?q=Vick",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Xbox",
        "query": "Xbox",
        "url": "http://twitter.com/search?q=Xbox",
        "promoted_content": null
      },
      {
        "name": "Walmart",
        "query": "Walmart",
        "url": "http://twitter.com/search?q=Walmart",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'San Diego',
    state: 'CA',
    img: 'san-diego.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#DETvsATL",
        "query": "%23DETvsATL",
        "url": "http://twitter.com/search?q=%23DETvsATL",
        "promoted_content": null
      },
      {
        "name": "San Diego",
        "query": "%22San+Diego%22",
        "url": "http://twitter.com/search?q=%22San+Diego%22",
        "promoted_content": null
      },
      {
        "name": "Giants",
        "query": "Giants",
        "url": "http://twitter.com/search?q=Giants",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      },
      {
        "name": "Utah",
        "query": "Utah",
        "url": "http://twitter.com/search?q=Utah",
        "promoted_content": null
      },
      {
        "name": "Falcons",
        "query": "Falcons",
        "url": "http://twitter.com/search?q=Falcons",
        "promoted_content": null
      },
      {
        "name": "Cam Newton",
        "query": "%22Cam+Newton%22",
        "url": "http://twitter.com/search?q=%22Cam+Newton%22",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'St. Louis',
    state: 'MO',
    img: 'st-louis.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#STLvsKC",
        "query": "%23STLvsKC",
        "url": "http://twitter.com/search?q=%23STLvsKC",
        "promoted_content": null
      },
      {
        "name": "Rams",
        "query": "Rams",
        "url": "http://twitter.com/search?q=Rams",
        "promoted_content": null
      },
      {
        "name": "Saffold",
        "query": "Saffold",
        "url": "http://twitter.com/search?q=Saffold",
        "promoted_content": null
      },
      {
        "name": "Knile Davis",
        "query": "%22Knile+Davis%22",
        "url": "http://twitter.com/search?q=%22Knile+Davis%22",
        "promoted_content": null
      },
      {
        "name": "Aaron Donald",
        "query": "%22Aaron+Donald%22",
        "url": "http://twitter.com/search?q=%22Aaron+Donald%22",
        "promoted_content": null
      },
      {
        "name": "Steelers",
        "query": "Steelers",
        "url": "http://twitter.com/search?q=Steelers",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Blackhawks",
        "query": "Blackhawks",
        "url": "http://twitter.com/search?q=Blackhawks",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Las Vegas',
    state: 'NV',
    img: 'las-vegas.png',
    trending: [
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "The Bears",
        "query": "%22The+Bears%22",
        "url": "http://twitter.com/search?q=%22The+Bears%22",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#UFC179",
        "query": "%23UFC179",
        "url": "http://twitter.com/search?q=%23UFC179",
        "promoted_content": null
      },
      {
        "name": "Yeezus",
        "query": "Yeezus",
        "url": "http://twitter.com/search?q=Yeezus",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Las Vegas",
        "query": "%22Las+Vegas%22",
        "url": "http://twitter.com/search?q=%22Las+Vegas%22",
        "promoted_content": null
      },
      {
        "name": "Steelers",
        "query": "Steelers",
        "url": "http://twitter.com/search?q=Steelers",
        "promoted_content": null
      },
      {
        "name": "Utah",
        "query": "Utah",
        "url": "http://twitter.com/search?q=Utah",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Denver',
    state: 'CO',
    img: 'denver.png',
    trending: [
      {
        "name": "Pearl Jam",
        "query": "Pearl+Jam",
        "url": "http://twitter.com/search?q=Pearl+Jam",
        "promoted_content": null,
        "lat": 39.748,
        "lng": -105.007,
        "min_timestamp": 1413936000000,
        "max_timestamp": 1414022399000,
        "callType": "location"
      },
      {
        "name": "The Bears",
        "query": "%22The+Bears%22",
        "url": "http://twitter.com/search?q=%22The+Bears%22",
        "promoted_content": null
      },
      {
        "name": "Denver",
        "query": "Denver",
        "url": "http://twitter.com/search?q=Denver",
        "promoted_content": null
      },
      {
        "name": "Colorado",
        "query": "Colorado",
        "url": "http://twitter.com/search?q=Colorado",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      },
      {
        "name": "Vick",
        "query": "Vick",
        "url": "http://twitter.com/search?q=Vick",
        "promoted_content": null
      },
      {
        "name": "Prater",
        "query": "Prater",
        "url": "http://twitter.com/search?q=Prater",
        "promoted_content": null
      },
      {
        "name": "Broncos",
        "query": "Broncos",
        "url": "http://twitter.com/search?q=Broncos",
        "promoted_content": null
      },
      {
        "name": "#GoAvsGo",
        "query": "%23GoAvsGo",
        "url": "http://twitter.com/search?q=%23GoAvsGo",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'New Orleans',
    state: 'LA',
    img: 'new-orleans.png',
    trending: [
      {
        "name": "Saints",
        "query": "Saints",
        "url": "http://twitter.com/search?q=Saints",
        "promoted_content": null
      },
      {
        "name": "Bo Wallace",
        "query": "%22Bo+Wallace%22",
        "url": "http://twitter.com/search?q=%22Bo+Wallace%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      },
      {
        "name": "#GeauxTigers",
        "query": "%23GeauxTigers",
        "url": "http://twitter.com/search?q=%23GeauxTigers",
        "promoted_content": null
      },
      {
        "name": "#LSUvsMISS",
        "query": "%23LSUvsMISS",
        "url": "http://twitter.com/search?q=%23LSUvsMISS",
        "promoted_content": null
      },
      {
        "name": "Waffle House",
        "query": "%22Waffle+House%22",
        "url": "http://twitter.com/search?q=%22Waffle+House%22",
        "promoted_content": null
      },
      {
        "name": "New Orleans",
        "query": "%22New+Orleans%22",
        "url": "http://twitter.com/search?q=%22New+Orleans%22",
        "promoted_content": null
      },
      {
        "name": "The NFC South",
        "query": "%22The+NFC+South%22",
        "url": "http://twitter.com/search?q=%22The+NFC+South%22",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'San Francisco',
    state: 'CA',
    img: 'san-francisco.png',
    trending: [
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null,
        "lat": 37.77,
        "lng": -122.38,
        "min_timestamp": 1414364385197,
        "max_timestamp": 1414407655556,
        "callType": "location"
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Van Persie",
        "query": "%22Van+Persie%22",
        "url": "http://twitter.com/search?q=%22Van+Persie%22",
        "promoted_content": null
      },
      {
        "name": "Giants",
        "query": "Giants",
        "url": "http://twitter.com/search?q=Giants",
        "promoted_content": null
      },
      {
        "name": "#ColleensCorner",
        "query": "%23ColleensCorner",
        "url": "http://twitter.com/search?q=%23ColleensCorner",
        "promoted_content": null
      },
      {
        "name": "Bears",
        "query": "Bears",
        "url": "http://twitter.com/search?q=Bears",
        "promoted_content": null
      },
      {
        "name": "Schaub",
        "query": "Schaub",
        "url": "http://twitter.com/search?q=Schaub",
        "promoted_content": null
      },
      {
        "name": "Petit",
        "query": "Petit",
        "url": "http://twitter.com/search?q=Petit",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'New York City',
    state: 'NY',
    img: 'new-york-city.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#BUFvsNYJ",
        "query": "%23BUFvsNYJ",
        "url": "http://twitter.com/search?q=%23BUFvsNYJ",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "#JetsvsBills",
        "query": "%23JetsvsBills",
        "url": "http://twitter.com/search?q=%23JetsvsBills",
        "promoted_content": null
      },
      {
        "name": "Lamarr Houston",
        "query": "%22Lamarr+Houston%22",
        "url": "http://twitter.com/search?q=%22Lamarr+Houston%22",
        "promoted_content": null
      },
      {
        "name": "Nick Folk",
        "query": "%22Nick+Folk%22",
        "url": "http://twitter.com/search?q=%22Nick+Folk%22",
        "promoted_content": null
      },
      {
        "name": "#Steelers",
        "query": "%23Steelers",
        "url": "http://twitter.com/search?q=%23Steelers",
        "promoted_content": null
      },
      {
        "name": "John Brown",
        "query": "%22John+Brown%22",
        "url": "http://twitter.com/search?q=%22John+Brown%22",
        "promoted_content": null
      },
      {
        "name": "Matt Simms",
        "query": "%22Matt+Simms%22",
        "url": "http://twitter.com/search?q=%22Matt+Simms%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Los Angeles',
    state: 'CA',
    img: 'los-angeles.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "#LetUsIn",
        "query": "%23LetUsIn",
        "url": "http://twitter.com/search?q=%23LetUsIn",
        "promoted_content": null
      },
      {
        "name": "#kings1",
        "query": "%23kings1",
        "url": "http://twitter.com/search?q=%23kings1",
        "promoted_content": null
      },
      {
        "name": "#SEAvsCAR",
        "query": "%23SEAvsCAR",
        "url": "http://twitter.com/search?q=%23SEAvsCAR",
        "promoted_content": null
      },
      {
        "name": "Kelvin Benjamin",
        "query": "%22Kelvin+Benjamin%22",
        "url": "http://twitter.com/search?q=%22Kelvin+Benjamin%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "John Brown",
        "query": "%22John+Brown%22",
        "url": "http://twitter.com/search?q=%22John+Brown%22",
        "promoted_content": null
      },
      {
        "name": "Van Persie",
        "query": "%22Van+Persie%22",
        "url": "http://twitter.com/search?q=%22Van+Persie%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Minneapolis',
    state: 'MN',
    img: 'minneapolis.png',
    trending: [
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Jennings",
        "query": "Jennings",
        "url": "http://twitter.com/search?q=Jennings",
        "promoted_content": null
      },
      {
        "name": "Vikings",
        "query": "Vikings",
        "url": "http://twitter.com/search?q=Vikings",
        "promoted_content": null
      },
      {
        "name": "Tampa Bay",
        "query": "%22Tampa+Bay%22",
        "url": "http://twitter.com/search?q=%22Tampa+Bay%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#DETvsATL",
        "query": "%23DETvsATL",
        "url": "http://twitter.com/search?q=%23DETvsATL",
        "promoted_content": null
      },
      {
        "name": "Gronk",
        "query": "Gronk",
        "url": "http://twitter.com/search?q=Gronk",
        "promoted_content": null
      },
      {
        "name": "#SKOL",
        "query": "%23SKOL",
        "url": "http://twitter.com/search?q=%23SKOL",
        "promoted_content": null
      },
      {
        "name": "Everson Griffen",
        "query": "%22Everson+Griffen%22",
        "url": "http://twitter.com/search?q=%22Everson+Griffen%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Washington D.C.',
    state: 'WASHINGTON DC',
    img: 'washington-dc.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#BALvsCIN",
        "query": "%23BALvsCIN",
        "url": "http://twitter.com/search?q=%23BALvsCIN",
        "promoted_content": null
      },
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "Ravens",
        "query": "Ravens",
        "url": "http://twitter.com/search?q=Ravens",
        "promoted_content": null
      },
      {
        "name": "#DETvsATL",
        "query": "%23DETvsATL",
        "url": "http://twitter.com/search?q=%23DETvsATL",
        "promoted_content": null
      },
      {
        "name": "#BUFvsNYJ",
        "query": "%23BUFvsNYJ",
        "url": "http://twitter.com/search?q=%23BUFvsNYJ",
        "promoted_content": null
      },
      {
        "name": "Gronk",
        "query": "Gronk",
        "url": "http://twitter.com/search?q=Gronk",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Van Persie",
        "query": "%22Van+Persie%22",
        "url": "http://twitter.com/search?q=%22Van+Persie%22",
        "promoted_content": null
      },
      {
        "name": "Geno Smith",
        "query": "%22Geno+Smith%22",
        "url": "http://twitter.com/search?q=%22Geno+Smith%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Seattle',
    state: 'WA',
    img: 'seattle.png',
    trending: [
      {
        "name": "#SEAvsCAR",
        "query": "%23SEAvsCAR",
        "url": "http://twitter.com/search?q=%23SEAvsCAR",
        "promoted_content": null
      },
      {
        "name": "Cam Newton",
        "query": "%22Cam+Newton%22",
        "url": "http://twitter.com/search?q=%22Cam+Newton%22",
        "promoted_content": null
      },
      {
        "name": "#GoHawks",
        "query": "%23GoHawks",
        "url": "http://twitter.com/search?q=%23GoHawks",
        "promoted_content": null
      },
      {
        "name": "The Steelers",
        "query": "%22The+Steelers%22",
        "url": "http://twitter.com/search?q=%22The+Steelers%22",
        "promoted_content": null
      },
      {
        "name": "Carolina",
        "query": "Carolina",
        "url": "http://twitter.com/search?q=Carolina",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Bruce Irvin",
        "query": "%22Bruce+Irvin%22",
        "url": "http://twitter.com/search?q=%22Bruce+Irvin%22",
        "promoted_content": null
      },
      {
        "name": "#BALvsCIN",
        "query": "%23BALvsCIN",
        "url": "http://twitter.com/search?q=%23BALvsCIN",
        "promoted_content": null
      },
      {
        "name": "Kelvin Benjamin",
        "query": "%22Kelvin+Benjamin%22",
        "url": "http://twitter.com/search?q=%22Kelvin+Benjamin%22",
        "promoted_content": null
      },
      {
        "name": "Hauschka",
        "query": "Hauschka",
        "url": "http://twitter.com/search?q=Hauschka",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'San Antonio',
    state: 'TX',
    img: 'san-antonio.png',
    trending: [
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "San Antonio",
        "query": "%22San+Antonio%22",
        "url": "http://twitter.com/search?q=%22San+Antonio%22",
        "promoted_content": null
      },
      {
        "name": "Texas",
        "query": "Texas",
        "url": "http://twitter.com/search?q=Texas",
        "promoted_content": null
      },
      {
        "name": "UTEP",
        "query": "UTEP",
        "url": "http://twitter.com/search?q=UTEP",
        "promoted_content": null
      },
      {
        "name": "Geno Smith",
        "query": "%22Geno+Smith%22",
        "url": "http://twitter.com/search?q=%22Geno+Smith%22",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      },
      {
        "name": "UTSA",
        "query": "UTSA",
        "url": "http://twitter.com/search?q=UTSA",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Warren",
        "query": "Warren",
        "url": "http://twitter.com/search?q=Warren",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Chicago',
    state: 'IL',
    img: 'chicago.png',
    trending: [
      {
        "name": "#CHIvsNE",
        "query": "%23CHIvsNE",
        "url": "http://twitter.com/search?q=%23CHIvsNE",
        "promoted_content": null
      },
      {
        "name": "Lamar Houston",
        "query": "%22Lamar+Houston%22",
        "url": "http://twitter.com/search?q=%22Lamar+Houston%22",
        "promoted_content": null
      },
      {
        "name": "#BearsvsPats",
        "query": "%23BearsvsPats",
        "url": "http://twitter.com/search?q=%23BearsvsPats",
        "promoted_content": null
      },
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Gronk",
        "query": "Gronk",
        "url": "http://twitter.com/search?q=Gronk",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Cutler",
        "query": "Cutler",
        "url": "http://twitter.com/search?q=Cutler",
        "promoted_content": null
      },
      {
        "name": "Down 25",
        "query": "%22Down+25%22",
        "url": "http://twitter.com/search?q=%22Down+25%22",
        "promoted_content": null
      },
      {
        "name": "Bennett",
        "query": "Bennett",
        "url": "http://twitter.com/search?q=Bennett",
        "promoted_content": null
      },
      {
        "name": "Anthony Barr",
        "query": "%22Anthony+Barr%22",
        "url": "http://twitter.com/search?q=%22Anthony+Barr%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Miami',
    state: 'FL',
    img: 'miami.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "#MIAvsJAX",
        "query": "%23MIAvsJAX",
        "url": "http://twitter.com/search?q=%23MIAvsJAX",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Blake Bortles",
        "query": "%22Blake+Bortles%22",
        "url": "http://twitter.com/search?q=%22Blake+Bortles%22",
        "promoted_content": null
      },
      {
        "name": "Dolphins",
        "query": "Dolphins",
        "url": "http://twitter.com/search?q=Dolphins",
        "promoted_content": null
      },
      {
        "name": "Brent Grimes",
        "query": "%22Brent+Grimes%22",
        "url": "http://twitter.com/search?q=%22Brent+Grimes%22",
        "promoted_content": null
      },
      {
        "name": "Miami",
        "query": "Miami",
        "url": "http://twitter.com/search?q=Miami",
        "promoted_content": null
      },
      {
        "name": "Pick 6",
        "query": "%22Pick+6%22",
        "url": "http://twitter.com/search?q=%22Pick+6%22",
        "promoted_content": null
      },
      {
        "name": "Geno",
        "query": "Geno",
        "url": "http://twitter.com/search?q=Geno",
        "promoted_content": null
      },
      {
        "name": "#LifeYouWantMIA",
        "query": "%23LifeYouWantMIA",
        "url": "http://twitter.com/search?q=%23LifeYouWantMIA",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Portland',
    state: 'OR',
    img: 'portland.png',
    trending: [
      {
        "name": "#SEAvsCAR",
        "query": "%23SEAvsCAR",
        "url": "http://twitter.com/search?q=%23SEAvsCAR",
        "promoted_content": null
      },
      {
        "name": "#RCTID",
        "query": "%23RCTID",
        "url": "http://twitter.com/search?q=%23RCTID",
        "promoted_content": null
      },
      {
        "name": "Kelvin Benjamin",
        "query": "%22Kelvin+Benjamin%22",
        "url": "http://twitter.com/search?q=%22Kelvin+Benjamin%22",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Portland",
        "query": "Portland",
        "url": "http://twitter.com/search?q=Portland",
        "promoted_content": null
      },
      {
        "name": "Oregon",
        "query": "Oregon",
        "url": "http://twitter.com/search?q=Oregon",
        "promoted_content": null
      },
      {
        "name": "#GoHawks",
        "query": "%23GoHawks",
        "url": "http://twitter.com/search?q=%23GoHawks",
        "promoted_content": null
      },
      {
        "name": "Timbers",
        "query": "Timbers",
        "url": "http://twitter.com/search?q=Timbers",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'Austin',
    state: 'TX',
    img: 'austin.png',
    trending: [
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "Bo Wallace",
        "query": "%22Bo+Wallace%22",
        "url": "http://twitter.com/search?q=%22Bo+Wallace%22",
        "promoted_content": null
      },
      {
        "name": "Texas",
        "query": "Texas",
        "url": "http://twitter.com/search?q=Texas",
        "promoted_content": null
      },
      {
        "name": "Steelers",
        "query": "Steelers",
        "url": "http://twitter.com/search?q=Steelers",
        "promoted_content": null
      },
      {
        "name": "Vick",
        "query": "Vick",
        "url": "http://twitter.com/search?q=Vick",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Xbox",
        "query": "Xbox",
        "url": "http://twitter.com/search?q=Xbox",
        "promoted_content": null
      },
      {
        "name": "Walmart",
        "query": "Walmart",
        "url": "http://twitter.com/search?q=Walmart",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'San Diego',
    state: 'CA',
    img: 'san-diego.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#DETvsATL",
        "query": "%23DETvsATL",
        "url": "http://twitter.com/search?q=%23DETvsATL",
        "promoted_content": null
      },
      {
        "name": "San Diego",
        "query": "%22San+Diego%22",
        "url": "http://twitter.com/search?q=%22San+Diego%22",
        "promoted_content": null
      },
      {
        "name": "Giants",
        "query": "Giants",
        "url": "http://twitter.com/search?q=Giants",
        "promoted_content": null
      },
      {
        "name": "#WorldSeries",
        "query": "%23WorldSeries",
        "url": "http://twitter.com/search?q=%23WorldSeries",
        "promoted_content": null
      },
      {
        "name": "Utah",
        "query": "Utah",
        "url": "http://twitter.com/search?q=Utah",
        "promoted_content": null
      },
      {
        "name": "Falcons",
        "query": "Falcons",
        "url": "http://twitter.com/search?q=Falcons",
        "promoted_content": null
      },
      {
        "name": "Cam Newton",
        "query": "%22Cam+Newton%22",
        "url": "http://twitter.com/search?q=%22Cam+Newton%22",
        "promoted_content": null
      },
      {
        "name": "Ole Miss",
        "query": "%22Ole+Miss%22",
        "url": "http://twitter.com/search?q=%22Ole+Miss%22",
        "promoted_content": null
      }
    ]
  },
  {
    city: 'St. Louis',
    state: 'MO',
    img: 'st-louis.png',
    trending: [
      {
        "name": "#asklauren",
        "query": "%23asklauren",
        "url": "http://twitter.com/search?q=%23asklauren",
        "promoted_content": null
      },
      {
        "name": "Halloween",
        "query": "Halloween",
        "url": "http://twitter.com/search?q=Halloween",
        "promoted_content": null
      },
      {
        "name": "#STLvsKC",
        "query": "%23STLvsKC",
        "url": "http://twitter.com/search?q=%23STLvsKC",
        "promoted_content": null
      },
      {
        "name": "Rams",
        "query": "Rams",
        "url": "http://twitter.com/search?q=Rams",
        "promoted_content": null
      },
      {
        "name": "Saffold",
        "query": "Saffold",
        "url": "http://twitter.com/search?q=Saffold",
        "promoted_content": null
      },
      {
        "name": "Knile Davis",
        "query": "%22Knile+Davis%22",
        "url": "http://twitter.com/search?q=%22Knile+Davis%22",
        "promoted_content": null
      },
      {
        "name": "Aaron Donald",
        "query": "%22Aaron+Donald%22",
        "url": "http://twitter.com/search?q=%22Aaron+Donald%22",
        "promoted_content": null
      },
      {
        "name": "Steelers",
        "query": "Steelers",
        "url": "http://twitter.com/search?q=Steelers",
        "promoted_content": null
      },
      {
        "name": "Tom Brady",
        "query": "%22Tom+Brady%22",
        "url": "http://twitter.com/search?q=%22Tom+Brady%22",
        "promoted_content": null
      },
      {
        "name": "Blackhawks",
        "query": "Blackhawks",
        "url": "http://twitter.com/search?q=Blackhawks",
        "promoted_content": null
      }
    ]
  }
];
