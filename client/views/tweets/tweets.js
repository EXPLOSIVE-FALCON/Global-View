angular.module('tweets', ['service_twitter'])

.controller('TweetsController', function ($scope, Twitter) {
  $scope.data = {};
  $scope.getTweets = function(request) {
    console.log('inside getTweets contr')
    Twitter.getTweets(request)
      .then(function(data) {
        $scope.data = data;
        console.log('scope Cntrl', $scope.data);
      })
  };
});