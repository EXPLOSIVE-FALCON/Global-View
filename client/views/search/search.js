angular.module('search', ['service_search'])

.controller('SearchController', function ($scope, Query) {
  $scope.data = {};
  
  $scope.getData = function(request) {
    console.log('inside getData cntrl, request:', request);
    Query.getData(request)
      .then(function(result) {
        console.log('RICHARD HEY', result);
        $scope.data = result;
        console.log('$scope.data', $scope.data);
      })
  };
});
  // .factory('MySuperFactory',function(){
  //   var data = {};
  //   var getData = function(request) {
  //   console.log('inside getData cntrl, request:', request);
  //   Query.getData(request)
  //     .then(function(result) {
  //       $scope.data = result;
  //       console.log('$scope.data', $scope.data);
  //     })
  // };
  //   return {
  //     data:data,
  //     getData:getData
  //   }
  // })