'use strict';

angular.module('timeBill.today', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/today', {
    templateUrl: 'partials/today',
    controller: 'todayContrl'
  });
}])

.controller('todayContrl', ['$scope', '$http', function($scope, $http) {
  //TODO 获取流水类型
  var loadingBillTypes = $http.get('/api/bill-types');
  loadingBillTypes.success(function(data, status, headers, config) {
    $scope.billTypes = data;
  });

  //TODO 获取今天的流水记录
  var records = [{
    id: 1,
    typeId: 1,
    typeName: '阅读',
    detail: '订阅',
    startTime: '2016-08-23 08:30:00',
    endTime: '2016-08-23 09:30:00',
    durationTime: 3600
  }, {
    id: 2,
    typeId: 2,
    typeName: '编码',
    detail: '100ms频谱',
    startTime: '2016-08-23 09:30:00',
    endTime: '2016-08-23 11:00:00',
    durationTime: 5400
  }, {
    id: 3,
    typeId: 3,
    typeName: '学习',
    detail: 'angularJS',
    startTime: '2016-08-23 11:00:00',
    endTime: '2016-08-23 12:00:00',
    durationTime: 3600
  }];

  $scope.records = records;

  $scope.today = new Date();

  $scope.formatDurationTime = function(durationTime) {
    var str = '',
      remain;
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

  $scope.showAddRecord = function() {

  }

  $scope.addRecord = function() {

  }

  /**
   * 展示编辑记录窗口
   * @param  {Integer} id 时间账单的index
   */
  $scope.showEditRecord = function(id) {
    console.log(id)

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
