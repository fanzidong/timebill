'use strict';

angular.module('timeBill.week', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week', {
    templateUrl: 'partials/week',
    controller: 'weekContrl'
  });
}])

.controller('weekContrl', ['$scope', '$http', function($scope, $http) {
  $scope.startDay = moment().startOf('isoWeek').format('YYYY-MM-DD');
  $scope.endDay = moment().endOf('isoWeek').format('YYYY-MM-DD');

  // 获取本周统计信息
  var loadingWeekDailySummayInfo = $http.get('/api/time-bills/daily/week');
  loadingWeekDailySummayInfo.success(function(data, status, headers, config) {
    $scope.days = data;
    var duration = 0;
    for(var i=0, len=data.length; i<len; i++) {
      duration += data[i].dailyTime;
    }
    $scope.totalTime = duration;
    $scope.avgTime = duration / data.length;
  });
  loadingWeekDailySummayInfo.error(function() {

  });

  var loadingWeekTypeSummayInfo = $http.get('/api/time-bills/type/week');
  loadingWeekTypeSummayInfo.success(function(data, status, headers, config) {
    $scope.types = data;
  });
  loadingWeekTypeSummayInfo.error(function() {

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
