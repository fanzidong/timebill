'use strict';

angular.module('timeBill.authenticate', ['ui.router', 'ngStorage'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'partials/login',
    controller: 'loginContrl'
  });
}])

.controller('loginContrl', ['$scope', '$rootScope', '$http', 'AuthService', '$localStorage', function($scope, $rootScope, $http, AuthService, $localStorage) {
  $scope.user = {
    username: '',
    password: ''
  }

  $scope.login = function(user) {
    AuthService.login(user).then(function(user) {
      $rootScope.$broadcast('login-success');
      $localStorage.user = user;
      $scope.setCurrentUser(user);
    }, function() {
      $rootScope.$broadcast('login-failed');
    });

  }
}]);
