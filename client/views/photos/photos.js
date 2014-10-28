/*
*  Photo Controller (Depreciated) -  will work if used however
*/
angular.module('photos', ['globalMethods', 'storedData'])
.controller('PhotoController', function ($scope, StoredData, GlobalMethods) {
  $scope.photos = StoredData.photos
  $scope.getPhotos = GlobalMethods.getPhotos;
});