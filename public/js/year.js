'use strict';

angular.module('timeBill.year', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/year', {
    templateUrl: 'partials/year',
    controller: 'yearContrl'
  });
}])

.controller('yearContrl', ['$scope', function($scope) {

}]);
