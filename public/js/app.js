'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('timeBill', [
  'ngMaterial',
  'ngRoute',
  'ui.router',
  'angular-md5',
  'timeBill.controllers',
  'timeBill.daily',
  'timeBill.week',
  'timeBill.month',
  'timeBill.year',
  'timeBill.all',
  'timeBill.billType',
  'timeBill.filters',
  'timeBill.services',
  'timeBill.directives',
  'timeBill.authenticate',
  'timeBill.user'
]).
config(function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    templateUrl: 'partials/home'
  });

  $urlRouterProvider.otherwise('/daily/0');

  $locationProvider.html5Mode(true);

});

app.factory('AuthService', ['$http', 'Session', '$location', 'md5', function($http, Session, $location, md5) {
  var authService = {};

  authService.login = function (user) {
    return $http
      .post('/login', {
        username: user.username,
        password: md5.createHash(user.password)
      })
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id, res.data.user.role);
        $location.path('/daily/0');
        return res.data.user;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  return authService;
}])

.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
})
.run(function ($rootScope, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    var needLogin = next.needLogin;
    if(needLogin && !AuthService.isAuthenticated()) {
      event.preventDefault();
      $rootScope.$broadcast('not-login');
    }
  });
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})
.factory('AuthInterceptor', function ($rootScope, $q, $state) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast(response.status, response);
      // if(response.status == 401) {
      //   $state.go('login');
      // }
      return $q.reject(response);
    }
  };
})
.controller('ApplicationController', function ($scope, AuthService, $localStorage, $state, $http) {
  $scope.currentUser = $localStorage.user || {};
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.logout = function() {
    $http
      .post('/logout')
      .then(function (res) {
        $localStorage.user = null;
        $scope.currentUser = null;
        $state.go('login');
      });
  }

  $scope.$on('401', function(d,data) {
      $state.go('login');
  });
});
