'use strict';

angular.module('timeBill.all', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/all', {
    templateUrl: 'partials/all',
    controller: 'allContrl'
  });
}])

.controller('allContrl', ['$scope', '$http', function($scope, $http) {
  var loadingTimeBills = $http.get('/api/time-bills/all');
  loadingTimeBills.success(function(data, status, headers, config) {
    $scope.timeBills = data;
  });

  $scope.formatDurationTime = function(durationTime) {
    var str = '',
      remain = durationTime;
    if(durationTime >= 3600) {
      var hour = Math.floor(durationTime / 3600);
      str += hour + '小时';
      remain = durationTime - hour * 3600;
    }
    if(remain >= 60) {
      var minite = Math.floor(remain / 60);
      str += minite + '分钟';
    }
    return str;
  }
}]);
