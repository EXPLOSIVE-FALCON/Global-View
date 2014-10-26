angular.module('splashMain', ['globalData', 'globalMethods'])
.controller('SplashController', function ($scope, StoredData, GlobalMethods) {
  // initiateMovement();
  // $('body').on('mousemove', '.a_splashHome', function(event) {
  //   checkMovement([event.pageX, event.pageY]);
  // });
  /*
  *  test data until twitter is done
  *  will need to build out functions to data on non 'dummy' object
  */
  $scope.data = {
    boxes: StoredData.cities 
  };
  $scope.populate = function() {

  };
});