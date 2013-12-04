'use strict';

// Declare the map module
function onGoogleReady() {

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

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/share', {templateUrl: 'partials/share.html', controller: 'ShareCtrl'});
    $routeProvider.when('/view', {templateUrl: 'partials/view.html', controller: 'ViewCtrl'});
    $routeProvider.otherwise({redirectTo: '/share'});
}]);
