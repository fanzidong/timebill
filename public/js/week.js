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
    today = moment().add(offset, 'w'),
    lastWeek = moment().add(offset - 1, 'w'),
    nextWeek = moment().add(offset + 1, 'w');

  $scope.offset = offset;
  $scope.startDay = moment().add(offset, 'w').startOf('isoWeek').format('YYYY-MM-DD');
  $scope.endDay = moment().add(offset, 'w').endOf('isoWeek').format('YYYY-MM-DD');

  $scope.prevStartDay = moment().add(offset - 1, 'w').startOf('isoWeek').format('MM.DD');
  $scope.prevEndDay = moment().add(offset - 1, 'w').endOf('isoWeek').format('MM.DD');

  $scope.nextStartDay = moment().add(offset + 1, 'w').startOf('isoWeek').format('MM.DD');
  $scope.nextEndDay = moment().add(offset + 1, 'w').endOf('isoWeek').format('MM.DD');

  // 获取本周统计信息
  var loadingWeekDailySummayInfo = $http.get('/api/time-bills/week/' + offset);
  loadingWeekDailySummayInfo.success(function(data, status, headers, config) {
    console.log(data)
    $scope.days = data;
    var duration = 0;
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

  $scope.getProgressColorByRank = function(rank) {
    if(rank == 0) {
      return "danger";
    } else if (rank == 1) {
      return "warning";
    } else if (rank == 2) {
      return "success";
    } else {
      return "info"
    }
  }
}]);
