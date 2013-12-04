/**
 * Callback function that bootstraps the angular app when the google maps api is loaded
 * @return {undefined} nothing returned
 */
function onGoogleReady() {

    'use strict';

    // Wait for the google maps api to load, then bootstrap our flare app.
    angular.bootstrap($('html'), ['beacon']);
}

// Declare app level module which depends on filters, and services
angular.module('beacon', [
    'ngRoute',
    'beacon.filters',
    'beacon.services',
    'beacon.directives',
    'beacon.controllers',
    'ui.map',
    'ngTouch'
])

// Configure the beacon module
.config(['$routeProvider', function ($routeProvider) {

    'use strict';

    $routeProvider
    .when('/share', {
        templateUrl: 'partials/share.html',
        controller: 'ShareCtrl'
    })
    .when('/view', {
        templateUrl: 'partials/view.html',
        controller: 'ViewCtrl'
    })
    .otherwise({
        redirectTo: '/share'
    });
}]);