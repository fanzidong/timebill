'use strict';

angular.module('timeBill.today', ['ngRoute', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/today', {
    templateUrl: 'partials/today',
    controller: 'todayContrl'
  });
}])

.controller('todayContrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  //TODO 获取今天的流水记录
  var loadingTimeBills = $http.get('/api/time-bills/today');
  loadingTimeBills.success(function(data, status, headers, config) {
    $scope.timeBills = data;
  });

  $scope.today = new Date();

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

  $scope.showAddBill = function() {
    // 加载所有账单类型
    var loadingBillTypes = $http.get('/api/bill-types');
    loadingBillTypes.success(function(data, status, headers, config) {
      $scope.billTypes = data;
      $('#timeBillModal').modal('show');
      $scope.timeBill = {
        typeId: 1,
        startTime: new Date() //$filter('date')(new Date(),'yyyy-MM-dd HH:mm')
      };
    });
  }

  $scope.timeChanged = function() {
    $scope.timeBill.startTime.setSeconds(0);
    $scope.timeBill.startTime.setMilliseconds(0)
    $scope.timeBill.endTime.setSeconds(0);
    $scope.timeBill.endTime.setMilliseconds(0)
    $scope.timeBill.durationTime = ($scope.timeBill.endTime.getTime() - $scope.timeBill.startTime.getTime()) / 1000;
  }

  $scope.addTimeBill = function() {
    console.log($scope.timeBill);
  }



  /**
   * 展示编辑记录窗口
   * @param  {Integer} id 时间账单的index
   */
  $scope.showEditBill = function(timeBill) {
    var loadingBillTypes = $http.get('/api/bill-types');
    loadingBillTypes.success(function(data, status, headers, config) {
      $scope.billTypes = data;
      $('#timeBillModal').modal('show');
      $scope.timeBill = timeBill;
    });
  }

  /**
   * [showDeleteRecord description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  $scope.showDeleteRecord = function(id) {
    console.log(id)
  }
}]);
