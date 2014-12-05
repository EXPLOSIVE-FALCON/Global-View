/*
*  Splash Controller -  City Data is controlled by here. Page Movement is initalized in controller 
*/
angular.module('splashMain', ['storedData', 'globalMethods', 'famous.angular'])
.controller('SplashController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = {
    boxes: StoredData.cities
  };

  // initiateMovement(); 
  $scope.movement = function() {
    console.log('moving');
    initiateMovement();
  }; 
  
  $('body').on('mousemove', '.a_splashHome', function(event) {
    checkMovement([event.pageX, event.pageY]);
  });
});