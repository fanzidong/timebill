'use strict';

angular.module('timeBill.month', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/month/:offset', {
    templateUrl: 'partials/month',
    controller: 'monthContrl'
  });
}])

.controller('monthContrl', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  var offset = parseInt($routeParams.offset || 0, 10),
    thisMonth = moment().add(offset, 'M');

  $scope.offset = offset;
  $scope.thisMonth = thisMonth.format('YYYY年MM月');

  // 获取本周统计信息
  var loadingWeekDailySummayInfo = $http.get('/api/time-bills/month/' + offset);
  loadingWeekDailySummayInfo.success(function(data, status, headers, config) {
    $scope.weeks = data;
    var duration = 0,
      dayNum = 0,
      year,
      week;
    for(var i=0, len=data.length; i<len; i++) {
      duration += data[i].durationTime;
      dayNum += data[i].dayNum;
      year = data[i].name.split('-')[0],
      week = data[i].name.split('-')[1];
      data[i].startDay = moment().year(year).isoWeek(week).startOf('isoWeek').format('YYYY-MM-DD');
      data[i].endDay = moment().year(year).isoWeek(week).endOf('isoWeek').format('YYYY-MM-DD');
    }
    $scope.totalTime = duration;
    $scope.avgTime = duration / dayNum;
  });
  loadingWeekDailySummayInfo.error(function() {

  });

  var loadingWeekTypeSummayInfo = $http.get('/api/time-bills/type/month/' + offset);
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

}]);
