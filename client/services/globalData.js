angular.module('GlobalData', ['service_twitter', 'service_news', 'service_instagram'])

.factory('GlobalData', function('') {
  var data = {
    news: [],
    photos: [],
    tweets: []
  };
  var getNews = function(request) {
    console.log('request', request);
    GoogleNews.getNews(request)
      .then(function(result) {
        $scope.data = result.data;
        console.log('inside get', $scope.data);
      })
  };
  var getPhotos = function(request) {
    Instagram.getPhotos(request)
      .then(function(data) {
        $scope.data = data;
      })
  };
  var getTweets = function(request) {
    console.log('inside getTweets contr')
    Twitter.getTweets(request)
      .then(function(data) {
        $scope.data = data;
        console.log('scope Cntrl', $scope.data);
      })
  };
  var getData = function(request) {
    console.log('inside getData cntrl, request:', request);
    Query.getData(request)
      .then(function(result) {
        $scope.data = result;
        console.log('$scope.data', $scope.data);
      })
  };

  return {
    data: data,
    getPhotos: getPhotos,
    getTweets: getTweets,
    getData: getData,
    getNews: getNews
  };
}