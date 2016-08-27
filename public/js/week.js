'use strict';

angular.module('timeBill.week', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week', {
    templateUrl: 'partials/week',
    controller: 'weekContrl'
  });
}])

.controller('weekContrl', ['$scope', function($scope) {
  
}]);
