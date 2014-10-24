angular.module('splashMain', [])
.controller('SplashController', function ($scope) {
  $scope.data = {
    boxes: test
  };
  $scope.populate = function() {

  };
});

$(document).ready(function() {
  setInterval(function() {
    console.log('scrolling');
    var max = $('.a_splashHome')[0].scrollWidth;
    var min = $(window).width();
    var diff = max - min;

    var max2 = $('.a_splashHome')[0].scrollHeight;
    // var min2 = $('.a_splashHome')[0].offsetHeight;
    var min2 = $(window).height();
    var diff2 = max2 - min2;

    console.log(diff, 'and', diff2);
    $('html, body').animate({
      scrollLeft: Math.floor(Math.random() * diff),
      scrollTop: Math.floor(Math.random() * diff2)
    }, 3000)
  }, 2500);
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