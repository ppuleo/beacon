/* Controllers */

angular.module('beacon.controllers', [])

.controller('ShareCtrl', ['$scope', 'geolocation', 'beaconState', function ($scope, geolocation, beaconState) {

    'use strict';

    if (beaconState.debug) { console.log('**** Beacon ShareCtrl: Init ****'); }

    $scope.mapOptions = {
        center: new google.maps.LatLng(37.776098, -122.4233427), // default in SF
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    $scope.mapReady = function () {

        geolocation.getLocation().then(

            // Success
            function (response) {
                console.log(response);
            },

            function (error) {
                console.log(error);
            }

        );
    };


}])

.controller('ViewCtrl', [function () {

}]);