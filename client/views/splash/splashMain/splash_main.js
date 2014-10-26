angular.module('splashMain', ['globalData', 'globalMethods'])
.controller('SplashController', function ($scope, StoredData, GlobalMethods) {
  initiateMovement();
  $('body').on('mousemove', '.a_splashHome', function(event) {
    checkMovement([event.pageX, event.pageY]);
  });
  /*
  *  test data until twitter is done
  *  will need to build out functions to data on non 'dummy' object
  */
  $scope.data = {
    boxes: cities
  };
  $scope.populate = function() {

  };
});

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