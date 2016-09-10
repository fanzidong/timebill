'use strict';

angular.module('timeBill.year', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/year/:offset', {
    templateUrl: 'partials/year',
    controller: 'yearContrl'
  });
}])

.controller('yearContrl', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  var offset = parseInt($routeParams.offset || 0, 10),
    thisYear = moment().add(offset, 'Y');

  $scope.offset = offset;
  $scope.thisYear = thisYear.format('YYYY年');

  // 获取本周统计信息
  var loadingWeekDailySummayInfo = $http.get('/api/time-bills/year/' + offset);
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

  var loadingWeekTypeSummayInfo = $http.get('/api/time-bills/type/year/' + offset);
  loadingWeekTypeSummayInfo.success(function(data, status, headers, config) {
    $scope.types = data;
    var maxTypeTime = 0;
    for(var i=0; i<data.length; i++) {
      maxTypeTime = Math.max(maxTypeTime, data[i].dailyTime);
    }
    $scope.maxTypeTime = maxTypeTime;
  });
  loadingWeekTypeSummayInfo.error(function() {

  });

}]);
