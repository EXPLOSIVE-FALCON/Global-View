/*
*  Returns Google News Stories 
*/
angular.module('service_news', [])
.factory('GoogleNews', function($http) {
  /* search term, location, and amount of results to return
  * need to add logic of inserting the location field depending 
  * on user input (if there is only state, put state, if there 
  * is no location, search for all US,  etc.)
  */
  var getNews = function(request) {
    var params = {
      query: request.query,
      location: request.state, 
      amount: 5
    };
    return $http({
      method: 'GET',
      url: '/api/googlenews',
      params: params
    })
    .then(function(response){
      return response.data;
    })
    .catch(function(error){
      console.error(error);
    });
  };

  return {
    getNews: getNews
  };
});
