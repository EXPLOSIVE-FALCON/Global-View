/*
* Tweet Controller allows for gathering tweets directly
*/
angular.module('tweets', ['globalMethods', 'globalData','service_twitter'])
.controller('TweetsController', function ($scope, StoredData, GlobalMethods,Twitter) {
  $scope.data = {
    tweets: StoredData.tweets,
    trendingCities: StoredData.trendingCities
  };
  $scope.getTweets = GlobalMethods.getTweets;
  $scope.getTrendingCities = GlobalMethods.getTrendingCities; 
});


