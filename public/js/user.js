'use strict';

angular.module('timeBill.user', ['ngRoute', 'ui.router'])

.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
  $stateProvider.state('home.user', {
    url: '/user',
    templateUrl: 'partials/user',
    controller: 'userContrl',
    needLogin: true
  });

  $routeProvider.when('/logout', {
    
  });
}])

.controller('userContrl', ['$scope', '$scope', '$http','Session', function($scope, $http, Session) {
  console.log($scope.currentUser)

}]);
