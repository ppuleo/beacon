/* Controllers */

angular.module('beacon.controllers', [])

.controller('ShareCtrl', ['$scope', 'geolocation', 'beaconState', function ($scope, geolocation, beaconState) {

    'use strict';

    if (beaconState.debug) { console.log('**** Beacon ShareCtrl: Init ****'); }

    // Private Methods

    /**
     * Creates a google maps marker
     * @param  {object} position google maps latlng object
     * @return {undefined} returns nothing
     */
    function createMarker(position) {

        if (beaconState.debug) { console.log('*** Beacon ShareCtrl: Creating Marker ***'); }


        // Build the marker config
        var config = {
            // icon: {
            //     //url: 'assets/icons/puck-active.png',
            //     scaledSize: new google.maps.Size(30, 30),
            //     size: new google.maps.Size(30, 30)
            // },
            position: position,
            map: $scope.beaconMap
        };

        // Create the marker
        var marker = new google.maps.Marker(config);

        //$scope.markers.push(marker);
    }

    /**
     * Centers the map on a location
     * @param  {object} position google maps latlng object
     */
    function centerMap(position) {

        if (beaconState.debug) { console.log('*** Beacon ShareCtrl: centerMap ' + position.latitude, position.longitude + ' ***'); }

        $scope.beaconMap.setCenter(position);
    }


    // Public Properties

    // Expose beaconState to scope
    $scope.beaconState = beaconState;

    $scope.user = {
        name: ''
    };

    $scope.mapOptions = {
        center: new google.maps.LatLng(37.776098, -122.4233427), // default in SF
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    // Public Methods
    $scope.mapReady = function () {

        if (!beaconState.map.isVisible) {
            geolocation.getLocation().then(

                // Success
                function (response) {

                    console.log(response);

                    // Drop a pin for the current user location
                    var position = new google.maps.LatLng(response.latitude, response.longitude);

                    // Create the marker
                    createMarker(position);

                    // Recenter the map
                    centerMap(position);

                    // Build the action button URL
                    $scope.url = $scope.buildLocationUrl(response, 'Fred');

                    if (response.message) {
                        console.log(response.message);
                    }
                    else {
                        beaconState.map.isVisible = true;
                    }
                },

                function (error) {
                    console.log(error);
                }

            );
        }
    };

     /**
     * Builds SMS and email links to the supplied position
     * @param {object} position google maps latlng object
     * @param {string} name The name of the person sharing location
     * @return {object} url An object containing SMS and email link strings
     */
    $scope.buildLocationUrl = function (position, name) {
        console.log(position);
        var subject = 'A beacon was shared with you from ' + name;
        var body = 'Go to the beacon: http://beacon.localhost';
        body += '/#/view';
        body += '?lat=' + position.latitude;
        body += '&lng=' + position.longitude;
        body += '&name='+name;

        var url = {
            sms: 'sms:?body=test',
            email: 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
        };

        return url;
    }


}])

/**
 * Controller for the Find view
 * @param  {object} $scope      Angular $scope
 * @param  {object} geolocation The beacon custom geolocation service
 * @param  {object} beaconState The beacon custom state service
 * @return {object} beacon.controllers Returns the beacon.controllers module for chaining
 */
.controller('FindCtrl', [function () {

}]);