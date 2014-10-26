/*
* Tweet Controller allows for gathering tweets directly
*/
angular.module('tweets', ['globalMethods', 'globalData','service_twitter'])
.controller('TweetsController', function ($scope, StoredData, GlobalMethods,Twitter) {
  $scope.data = {
    tweets: StoredData.data.tweets
  };
  $scope.getTweets = Twitter.getTweets;
  $scope.getTrendingCities = Twitter.getTrending; 
});