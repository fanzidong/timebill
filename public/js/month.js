'use strict';

angular.module('timeBill.month', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/month', {
    templateUrl: 'partials/week',
    controller: 'monthContrl'
  });
}])

.controller('monthContrl', ['$scope', function($scope) {

}]);
