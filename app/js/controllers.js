/* Controllers */

angular.module('beacon.controllers', [])

/**
 * Controller for the Share view
 * @param  {object} $scope      Angular $scope
 * @param  {object} geolocation The beacon custom geolocation service
 * @param  {object} beaconState The beacon custom state service
 * @return {object} beacon.controllers Returns the beacon.controllers module for chaining
 */
.controller('ShareCtrl', ['$scope', 'geolocation', 'beaconState', function ($scope, geolocation, beaconState) {

    'use strict';

    if (beaconState.debug) { console.log('**** Beacon ShareCtrl: Init ****'); }

    /* ------------------
     * Private Methods
     * ------------------ */

    /**
     * Creates a google maps marker
     * @param  {object} position google maps latlng object
     * @return {undefined}
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
     * @return {undefined}
     */
    function centerMap(position) {

        if (beaconState.debug) { console.log('*** Beacon ShareCtrl: centerMap ***'); }

        $scope.beaconMap.setCenter(position);
    }

    /**
     * Builds SMS and email links to the supplied position
     * @param {object} position google maps latlng object
     * @param {string} name The name of the person sharing location
     * @return {object} url An object containing SMS and email link strings
     */
    function buildLocationUrl(position, name) {

        var subject = name + ' shared a location beacon with you';
        var body = name + ' is here: http://beacon.localhost';
        body += '/#/view';
        body += '?lat=' + position.latitude;
        body += '&lng=' + position.longitude;
        body += '&name=' + name;

        var url = {
            sms: 'sms:?body=test',
            email: 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
        };

        return url;
    }


    /* ------------------
     * Public Properties
     * ------------------ */

    // Expose beaconState to scope
    $scope.beaconState = beaconState;

    // Scope model for the user name
    $scope.user = {
        name: ''
    };

    // Scope model for the map options (gets passed to the ui-map directive)
    $scope.mapOptions = {
        center: new google.maps.LatLng(37.776098, -122.4233427), // default in SF
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    /* ---------------
     * Public Methods
     * --------------- */

    /**
     * Initializes the map, gets the user's location and calls the methods to center the map and drop
     * a pin on the user's location
     * @return {undefined}
     */
    $scope.mapReady = function () {

        if (!beaconState.map.isVisible) {

            geolocation.getLocation().then(

                // Success - handles deferred.resolve
                function (response) {

                    // Drop a pin for the current user location
                    var position = new google.maps.LatLng(response.latitude, response.longitude);

                    // Create the marker
                    createMarker(position);

                    // Recenter the map
                    centerMap(position);

                    // Build the action button URL
                    $scope.url = buildLocationUrl(response, 'Fred');

                    // Expose the response to scope for use by other public methods
                    beaconState.map.center = response;

                    if (response.message) {
                        console.log(response.message);
                    }
                    else {
                        beaconState.map.isVisible = true;
                    }
                },

                 // Error - handles deferred.reject
                function (error) {
                    console.log(error);
                    // TODO: Show a sad message...
                }

            );
        }
    };

    /**
     * Facade for the buildLocationUrl private method
     * @param  {string} name The name of the person sharing location
     * @return {undefined}
     */
    $scope.updateUrl = function (name) {

        // Build the action button URL
        $scope.url = buildLocationUrl(beaconState.map.center, name);
    };


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