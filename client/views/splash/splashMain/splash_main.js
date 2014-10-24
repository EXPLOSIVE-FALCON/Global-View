angular.module('splashMain', [])
.controller('SplashController', function ($scope) {
  initiateMovement();
  $('body').on('mousemove', '.a_splashHome', function(event) {
    checkMovement([event.pageX, event.pageY]);
  });

  $scope.data = {
    boxes: test
  };
  $scope.populate = function() {

  };
});

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