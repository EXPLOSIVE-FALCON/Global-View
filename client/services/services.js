angular.module('services', [])


.factory('Twitter', function($http){

  var getTweets = function(request) {
    return $http({
      method: 'GET',
      url: '/twitter'
    })
    .then(function(response){
      console.log('response.data');
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    })
  }

  return {
    getTweets: getTweets
  }
})


.factory('Instagram', function($http){

  var getInstaPhotos = function(request) {
    return $http({
      method: 'GET',
      url: '/instagram'
    })
    .then(function(response){
      console.log('response.data');
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    })
  }

  return {
    getInstaPhotos: getInstaPhotos
  }
})


.factory('GoogleNews', function($http){

  var getNews = function(request) {
    return $http({
      method: 'GET',
      url: '/news'
    })
    .then(function(response){
      console.log('response.data');
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    })
  }

  return {
    getNews: getNews
  }
})
