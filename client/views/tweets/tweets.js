/*
* Tweet Controller (Depreciated) - Will work if used. Alows for gathering tweets directly.
*/
angular.module('tweets', ['globalMethods', 'storedData','twitter'])
.controller('TweetsController', function ($scope, StoredData, GlobalMethods, Twitter) {
  $scope.tweets = StoredData.tweets;
  $scope.trendingCities = StoredData.trendingCities;
  $scope.getTweets = GlobalMethods.getTweets;
  $scope.getTrendingCities = GlobalMethods.getTrendingCities;
});