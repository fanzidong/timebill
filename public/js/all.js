'use strict';

angular.module('timeBill.all', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/all', {
    templateUrl: 'partials/all',
    controller: 'allContrl'
  });
}])

.controller('allContrl', ['$scope', function($scope) {

}]);
