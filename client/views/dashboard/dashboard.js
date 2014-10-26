angular.module('dashboard', ['globalData', 'globalMethods'])
.controller('DashboardController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = StoredData;
  $scope.GlobalMethods = GlobalMethods;
  /*
  *  these are fake requests to populate the page
  *  photos and tweets are not working 
  */
  GlobalMethods.getNews(fakeRequest);
  // GlobalMethods.getTweets(fakeRequest);
  // GlobalMethods.getPhotos(fakeRequest); 
  /* 
  *  end fake requests
  */
  var populate = function(city, trendingTopic) {

  };  
});

var fakeRequest = {
  city: "san francisco",
  date: new Date(),
  query: "ebola",
  state: "ca",
  street: "944 market st"
};