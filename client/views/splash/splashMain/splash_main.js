angular.module('splashMain', ['service_twitter', 'service_instagram'])
.controller('SplashController', function ($scope, Twitter, Instagram) {
  initiateMovement();
  $('body').on('mousemove', '.a_splashHome', function(event) {
    checkMovement([event.pageX, event.pageY]);
  });
  /*
  *  test data until twitter is done
  *  will need to build out functions to data on non 'dummy' object
  */
  $scope.data = {
    boxes: test
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

var cities = [
  'San Francisco',
  'New York City',
  'Los Angeles',
  'Minneapolis',
  'Washington D.C.',
  'Seattle',
  'San Antonio',
  'Chicago',
  'Miami',
  'Saint Paul',
  'Austin',
  'San Diego',
  'St. Louis', 
  'Las Vegas',
  'Phoenix ',
  'Tampa Bay'
];

var test = [
  {
    title: 'San Francisco'
  },
  {
    title: 'New York City'
  },
  {
    title: 'Los Angeles'
  },
  {
    title: 'Minneapolis'
  },
  {
    title: 'Washington D.C.'
  },
  {
    title: 'Seattle'
  },
  {
    title: 'San Antonio'
  },
  {
    title: 'Chicago'
  },
  {
    title: 'Miami'
  },
  {
    title: 'Saint Paul'
  },
  {
    title: 'Austin'
  },
  {
    title: 'San Diego'
  },
  {
    title: 'St. Louis'
  },
  {
    title: 'Las Vegas'
  },
  {
    title: 'Phoenix '
  },
  {
    title: 'Tampa Bay'
  },
  {
    title: 'San Francisco'
  },
  {
    title: 'New York City'
  },
  {
    title: 'Los Angeles'
  },
  {
    title: 'Minneapolis'
  },
  {
    title: 'Washington D.C.'
  },
  {
    title: 'Seattle'
  },
  {
    title: 'San Antonio'
  },
  {
    title: 'Chicago'
  },
  {
    title: 'Miami'
  },
  {
    title: 'Saint Paul'
  },
  {
    title: 'Austin'
  },
  {
    title: 'San Diego'
  },
  {
    title: 'St. Louis'
  },
  {
    title: 'Las Vegas'
  }
];