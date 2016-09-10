'use strict';

angular.module('timeBill.week', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week/:offset', {
    templateUrl: 'partials/week',
    controller: 'weekContrl'
  });
}])

.controller('weekContrl', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  var offset = parseInt($routeParams.offset || 0, 10),
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
    }
    $scope.totalTime = duration;
    $scope.avgTime = duration / data.length;
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

}]);
