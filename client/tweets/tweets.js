angular.module('tweets', [])

.controller('TweetsController', function ($scope, Twitter) {
  $scope.data = {};
  console.log($scope.data);
  $scope.getTweets = function(request){
    Twitter.getTweets(request)
      .then(function(data){
        $scope.data = data;
      })
  };
  $scope.getTweets({});
});
