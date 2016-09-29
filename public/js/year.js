'use strict';

angular.module('timeBill.year', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('home.year', {
    url: '/year/:offset',
    templateUrl: 'partials/year',
    controller: 'yearContrl',
    needLogin: true
  });
}])

.controller('yearContrl', ['$scope', '$http','$stateParams', '$state', function($scope, $http, $stateParams, $state) {
  var offset = parseInt($stateParams.offset || 0, 10),
    thisYear = moment().add(offset, 'Y');

  $scope.offset = offset;
  $scope.thisYear = thisYear.format('YYYY年');

  // 获取本周统计信息
  var loadingWeekDailySummayInfo = $http.get('/api/time-bills/year/' + offset);
  loadingWeekDailySummayInfo.success(function(data, status, headers, config) {
    $scope.months = data;
    var duration = 0,
      totalNum = 0;

    var effectiveTotalTime = 0;
    for(var i=0, len=data.length; i<len; i++) {
      duration += data[i].durationTime;
      effectiveTotalTime += data[i].effectiveTime;
      totalNum += data[i].dayNum;
    }
    $scope.totalTime = duration;
    $scope.effectiveTotalTime = effectiveTotalTime;
    $scope.totalDayNum = totalNum;
    $scope.avgTime = effectiveTotalTime / totalNum;
  });
  loadingWeekDailySummayInfo.error(function() {

  });

  var loadingWeekTypeSummayInfo = $http.get('/api/time-bills/type/year/' + offset);
  loadingWeekTypeSummayInfo.success(function(data, status, headers, config) {
    $scope.topTypes = data;
    var maxTypeTime = 0;

    for(var i=0; i<data.length; i++) {
      if(data[i].childrens[0]) {
        maxTypeTime = Math.max(maxTypeTime, data[i].childrens[0].durationTime);
      }
    }
    $scope.maxTypeTime = maxTypeTime;
  });
  loadingWeekTypeSummayInfo.error(function() {

  });

  $scope.$on('401', function(d,data) {
      $state.go('login');
  });

}]);
