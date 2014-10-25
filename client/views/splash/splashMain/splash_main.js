angular.module('splashMain', ['service_twitter', 'service_instagram'])
.controller('SplashController', function ($scope, Twitter, Instagram) {
  // initiateMovement();
  /*
  *  test data until twitter is done
  *  will need to build out functions to data on non 'dummy' object
  */
  $scope.data = {
    boxes: cities
  };

  // $scope.data = {
  //   boxes: {
  //     trends: Twitter.getTrending(cities),
  //     tweets: Twitter.getTwendingTweets(cities),
  //     photos: Instagram.getLocationPhoto(cities)
  // };
  $scope.populate = function() {

  };
});

// var cities = [
//   'San Francisco',
//   'New York City',
//   'Los Angeles',
//   'Minneapolis',
//   'Washington D.C.',
//   'Seattle',
//   'San Antonio',
//   'Chicago',
//   'Miami',
//   'Saint Paul',
//   'Austin',
//   'San Diego',
//   'St. Louis', 
//   'Las Vegas',
//   'Denver',
// ];
var cities = [
  {
    city: 'New Orleans',
    img: 'new-orleans.png'
  },
  {
    city: 'San Francisco',
    img: 'san-francisco.png'
  },
  {
    city: 'New York City',
    img: 'new-york-city.png'
  },
  {
    city: 'Los Angeles',
    img: 'los-angeles.png'
  },
  {
    city: 'Minneapolis',
    img: 'minneapolis.png'
  },
  {
    city: 'Washington D.C.',
    img: 'washington-dc.png'
  },
  {
    city: 'Seattle',
    img: 'seattle.png' 
  },
  {
    city: 'San Antonio',
    img: 'san-antonio.png'
  },
  {
    city: 'Chicago',
    img: 'chicago.png'
  },
  {
    city: 'Miami',
    img: 'miami.png'
  },
  {
    city: 'Portland',
    img: 'portland.png'
  },
  {
    city: 'Austin',
    img: 'austin.png'
  },
  {
    city: 'San Diego',
    img: 'san-diego.png'
  },
  {
    city: 'St. Louis', 
    img: 'st-louis.png'
  },
  {
    city: 'Las Vegas',
    img: 'las-vegas.png'
  },
  {
    city: 'Denver',
    img: 'denver.png'
  },
  {
    city: 'New Orleans',
    img: 'new-orleans.png'
  },
  {
    city: 'San Francisco',
    img: 'san-francisco.png'
  },
  {
    city: 'New York City',
    img: 'new-york-city.png'
  },
  {
    city: 'Los Angeles',
    img: 'los-angeles.png'
  },
  {
    city: 'Minneapolis',
    img: 'minneapolis.png'
  },
  {
    city: 'Washington D.C.',
    img: 'washington-dc.png'
  },
  {
    city: 'Seattle',
    img: 'seattle.png' 
  },
  {
    city: 'San Antonio',
    img: 'san-antonio.png'
  },
  {
    city: 'Chicago',
    img: 'chicago.png'
  },
  {
    city: 'Miami',
    img: 'miami.png'
  },
  {
    city: 'Portland',
    img: 'portland.png'
  },
  {
    city: 'Austin',
    img: 'austin.png'
  },
  {
    city: 'San Diego',
    img: 'san-diego.png'
  },
  {
    city: 'St. Louis', 
    img: 'st-louis.png'
  }
];