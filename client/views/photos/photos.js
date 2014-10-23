angular.module('photos', ['service_instagram'])

.controller('PhotoController', function ($scope, Instagram) {
  $scope.data = {};
  console.log($scope.data);
  $scope.getPhotos = function(request) {
    Instagram.getPhotos(request)
      .then(function(data) {
        $scope.data = data;
      })
  };
});