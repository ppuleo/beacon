/* Services */

/**
 * Beacon Services Module
 */
angular.module('beacon.services', [])

.value('version', '0.1')

/**
 * A geolocation service providing location methods and properties
 * @return {object} An instance of the geolocation service
 */
.factory('geolocation', ['$timeout', '$q', function ($timeout, $q) {

    'use strict';

    var geolocation = {
        currentLocation: {
            lat: 37.776098,
            lng: -122.4233427
        }
    };

    /**
     * Gets the current user's location
     * @return {promise} A promise that resolves to an object containing the lat/lng for the current
     * user's position
     */
    geolocation.getLocation = function () {

        // Set up a promise to return
        var deferred = $q.defer();

        /**
         * HTML5 Geolocation API success handler
         * @param  {object} position The object representing the location
         * @return {undefined} Nothing returned, promise resolved
         */
        function geoSuccessHandler(position) {

            // Get the coordinates from the HTML5 geolocation API.
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // If HTML5 geolocation reports success but fails to provide coordinates...
            if (!latitude || !longitude) {

                // Resolve the promise
                deferred.resolve({
                    latitude: null,
                    longitude: null,
                    message: {
                        type: 'error',
                        title: 'Location Error',
                        body: 'navigator.geolocation.getCurrentPosition returned bad data.'
                    }
                });
            }

            else {  // HTML5 geolocation success!

                // Resolve the promise
                deferred.resolve({
                    latitude: latitude,
                    longitude: longitude
                });
            }
        }

        /**
         * HTML5 Geolocation API error handler
         * @param  {object} error The object representing the error state
         * @return {undefined} Nothing returned, promise resolved
         */
        function geoErrorHandler(error) {

            // Resolve the promise
            deferred.resolve({
                latitude: null,
                longitude: null,
                message: {
                    type: 'error',
                    title: 'Location Error',
                    body: error || 'There was an error determining your location.'
                }
            });
        }

        // Check for HTML5 geolocation support.
        if (navigator.geolocation) {

            // Configure the geolocation options
            var geoOptions = {
                enableHighAccuracy: false,
                maximumAge: 30000,
                timeout: 5000
            };

            // Call HTML5 geolocation get position feature with handlers for success/error.
            navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler, geoOptions);
        }

        else { // If navigator.geolocation is falsy, there's no HTML5 geolocation support.

            // Resolve the promise
            deferred.resolve({
                latitude: null,
                longitude: null,
                message: {
                    type: 'alert',
                    title: 'Location Unknown',
                    body: 'Your browser does not support geolocation.'
                }
            });
        }

        return deferred.promise;
    };

    return geolocation; // return the instance of the geolocation service
}])

/**
 * A UI coordination service.
 */
.factory('beaconState', ['$location', function ($location) {

    'use strict';

    var beaconState = {

        // State Models
        isLive: true,

        // Debugging messages
        debug: $location.search().debug,

        // System Messages
        message: {
            active: false,
            type: 'banner',
            title: '',
            body: ''
        },

        // Maps
        map: {
            isVisible: false,
            isLoaded: false,
            mapOptions: {
                //center: new google.maps.LatLng(37.776098, -122.4233427), // default in SF
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                styles: [
                    {
                        'featureType': 'road',
                        'elementType': 'labels.text',
                        'stylers': [
                            { 'weight': 0.1 }
                        ]
                    },
                    {
                        'featureType': 'poi',
                        'elementType': 'labels.text',
                        'stylers': [
                            { 'weight': 0.1 }
                        ]
                    }
                ]
            }
        }
    };

    return beaconState; // return the instance of the beaconState service
}]);
