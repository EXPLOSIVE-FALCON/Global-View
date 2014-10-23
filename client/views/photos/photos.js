/*
*  Photo Controller can be used to pull photos from instagram
*/
angular.module('photos', ['globalMethods', 'globalData'])
.controller('PhotoController', function ($scope, StoredData, GlobalMethods) {
  $scope.data = {
    photos: StoredData.data.photos
  };
  $scope.getPhotos = GlobalMethods.getPhotos;
});