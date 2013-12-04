/* Controllers */

angular.module('beacon.controllers', [])

.controller('ShareCtrl', ['$scope', function ($scope) {

    'use strict';

    $scope.mapOptions = {
        center: new google.maps.LatLng(37.776098, -122.4233427), // default in SF
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    $scope.mapReady = function () {

    };


}])

.controller('ViewCtrl', [function () {

}]);