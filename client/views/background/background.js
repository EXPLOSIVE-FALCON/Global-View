// angular.module('background', ['storedData', 'globalMethods'])
// .controller('BackgroundController', function ($scope, StoredData, GlobalMethods) {

//   console.log("hi", StoredData);

//   var imageURL =  "url(" + $scope.data.cityImages + ") no-repeat center center fixed";
 

//   $('html').css("background", imageURL);

// });


angular.module('background', ['storedData', 'globalMethods'])
.controller('BackgroundController', function ($scope, StoredData, GlobalMethods) {
  // initiateMovement(); 

  $scope.data = {
    boxes: StoredData.cities
  };

  console.log("heyy", $scope.data.boxes);

});