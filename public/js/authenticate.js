'use strict';

angular.module('timeBill.authenticate', ['ui.router', 'angular-md5', 'ngStorage'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'partials/login',
    controller: 'authenticateContrl'
  }).state('register', {
    url: '/register',
    templateUrl: 'partials/register',
    controller: 'authenticateContrl'
  });
}])

.controller('authenticateContrl', ['$scope', '$rootScope', '$http', 'AuthService', '$localStorage', '$state', 'md5', function($scope, $rootScope, $http, AuthService, $localStorage, $state, md5) {
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

  $scope.showRegister = function() {
    $state.go('register');
  }

  $scope.register = function() {
    var username = $scope.username;
    var password = $scope.password;
    var confirmPassword = $scope.confirmPassword;

    if(!username || !password || !confirmPassword) {
      return;
    }
    if(password != confirmPassword) {
      alert('两次输入密码不一致');
      return;
    }

    // 下发注册请求
    var registerHttp = $http.post('/api/register', {
      username: username,
      password: md5.createHash(password)
    });
    registerHttp.success(function(data, status, headers, config) {
      // TODO 添加成功后刷新页面
      $state.go('login');
    });
    registerHttp.error(function(data, status, headers, config) {
      // TODO 失败后弹窗提示
      alert(data.msg);
    })
  }
}]);
