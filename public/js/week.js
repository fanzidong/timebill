'use strict';

angular.module('timeBill.week', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('home.week', {
    url: '/week/:offset',
    templateUrl: 'partials/week',
    controller: 'weekContrl',
    needLogin: true
  });
}])

.controller('weekContrl', ['$scope', '$http','$stateParams', '$state', function($scope, $http, $stateParams, $state) {
  var offset = parseInt($stateParams.offset || 0, 10),
    today = moment().add(offset, 'w');

  $scope.offset = offset;
  $scope.startDay = moment().add(offset, 'w').startOf('isoWeek').format('YYYY-MM-DD');
  $scope.endDay = moment().add(offset, 'w').endOf('isoWeek').format('YYYY-MM-DD');

  // 获取本周统计信息
  var loadingWeekDailySummayInfo = $http.get('/api/time-bills/week/' + offset);
  loadingWeekDailySummayInfo.success(function(data, status, headers, config) {
    console.log(data)
    $scope.days = data;
    var duration = 0;
    var effectiveTotalTime = 0;
    for(var i=0, len=data.length; i<len; i++) {
      duration += data[i].durationTime;
      effectiveTotalTime += data[i].effectiveTime;
    }
    $scope.totalTime = duration;
    $scope.effectiveTotalTime = effectiveTotalTime;
    $scope.avgTime = effectiveTotalTime / data.length;
  });
  loadingWeekDailySummayInfo.error(function() {

  });

  var loadingWeekTypeSummayInfo = $http.get('/api/time-bills/type/week/' + offset);
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
