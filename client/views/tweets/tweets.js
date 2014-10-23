/*
* Tweet Controller allows for gathering tweets directly
*/
angular.module('tweets', ['globalMethods', 'globalData'])
.controller('TweetsController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = {
    tweets: StoredData.data.tweets
  };
  $scope.getTweets = GlobalMethods.getTweets;
});