angular.module('photos', ['globalMethods', 'globalData'])
.controller('PhotoController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = {
    photos: StoredData.data.photos
  };
  $scope.getPhotos = GlobalMethods.getPhotos;
});