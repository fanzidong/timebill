'use strict';

angular.module('timeBill.year', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/year', {
    templateUrl: 'partials/year',
    controller: 'yearContrl'
  });
}])

.controller('yearContrl', ['$scope', '$http', function($scope, $http) {
  $scope.startDay = moment().startOf('year').format('YYYY-MM-DD');
  $scope.endDay = moment().endOf('year').format('YYYY-MM-DD');

  // 获取本周统计信息
  var loadingWeekDailySummayInfo = $http.get('/api/time-bills/daily/year');
  loadingWeekDailySummayInfo.success(function(data, status, headers, config) {
    $scope.months = data;
    var duration = 0,
      totalNum = 0;
    for(var i=0, len=data.length; i<len; i++) {
      duration += data[i].durationTime;
      totalNum += data[i].dayNum;
    }
    $scope.totalTime = duration;
    $scope.totalDayNum = totalNum;
    $scope.avgTime = duration / totalNum;
  });
  loadingWeekDailySummayInfo.error(function() {

  });

  var loadingWeekTypeSummayInfo = $http.get('/api/time-bills/type/year');
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
    }else {
      str += '0分钟';
    }
    return str;
  }
}]);
