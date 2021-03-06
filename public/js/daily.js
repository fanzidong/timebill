'use strict';

angular.module('timeBill.daily', ['ui.bootstrap.datetimepicker', 'ui.dateTimeInput', 'ui.router'])

.config(['$stateProvider', function( $stateProvider) {
  $stateProvider.state('home.daily', {
    url: '/daily/:offset',
    templateUrl: 'partials/daily',
    controller: 'dailyContrl',
    needLogin: true
  });
}])

.controller('dailyContrl', ['$scope', '$http', '$filter','$stateParams', '$state', function($scope, $http, $filter, $stateParams, $state) {
  var offset = parseInt($stateParams.offset || 0, 10);
  $scope.offset = offset;
  var date = moment().add(offset, 'd');
  var weekday = date.format('e');
  var weekdays = ['天', '一', '二', '三', '四', '五', '六'];
  $scope.today = date.format('YYYY年MM月DD日 星期') + weekdays[weekday];

  // 加载所有账单类型
  var loadingBillTypes = $http.get('/api/bill-types');
  loadingBillTypes.success(function(data, status, headers, config) {
    $scope.billTypes = data;
  });

  // 获取每日的流水记录
  _loadDailyTimeBills();

  // 加载今天的流水分类型统计
  _loadDailyTypeSummayInfo();

  $scope.showAddBill = function() {
    $('#timeBillModal').modal('show');
    $scope.action = 'add';
    $scope.actionName = '添加';
    $scope.timeBill = {
      typeId: 1,
      startTime: new Date() //$filter('date')(new Date(),'yyyy-MM-dd HH:mm')
    };
  }

  $scope.timeChanged = function() {
    if(!$scope.timeBill.startTime || !$scope.timeBill.endTime) {
      return;
    }
    $scope.timeBill.startTime.setSeconds(0);
    $scope.timeBill.startTime.setMilliseconds(0)
    $scope.timeBill.endTime.setSeconds(0);
    $scope.timeBill.endTime.setMilliseconds(0)
    $scope.timeBill.durationTime = ($scope.timeBill.endTime.getTime() - $scope.timeBill.startTime.getTime()) / 1000;
  }

  $scope.saveTimeBill = function() {
    var action = $scope.action;

    // 描述不能为空
    if(!$scope.timeBill.detail) {
      return;
    }
    // 开始时间不能为空
    if(!$scope.timeBill.startTime) {
      return;
    }

    if(action === 'add') {
      _addTimeBill($scope.timeBill);
    } else if(action === 'edit') {
      _editTimeBill($scope.timeBill);
    }
  }

  function _addTimeBill(timeBill) {
    //添加时间账单
    var addingTimeBills = $http.post('/api/time-bills', timeBill);
    addingTimeBills.success(function(data, status, headers, config) {
      // TODO 添加成功后刷新页面
      $('#timeBillModal').modal('hide');
      _loadDailyTimeBills();
      _loadDailyTypeSummayInfo();
    });
    addingTimeBills.error(function(data, status, headers, config) {
      // TODO 失败后弹窗提示
      alert(data.msg);
    })
  }

  /**
   * 展示编辑记录窗口
   * @param  {Integer} id 时间账单的index
   */
  $scope.showEditBill = function(timeBill) {
    if(!angular.isDate(timeBill.startTime) && timeBill.startTime) {
      timeBill.startTime = new Date(timeBill.startTime)
    }
    if(!angular.isDate(timeBill.endTime) && timeBill.endTime) {
      timeBill.endTime = new Date(timeBill.endTime)
    }
    $('#timeBillModal').modal('show');
    $scope.action = 'edit';
    $scope.actionName = '编辑';
    $scope.timeBill = timeBill;
  }

  function _editTimeBill(timeBill) {
    //编辑账单类型
    var editingTimeBills = $http.put('/api/time-bills/' + timeBill.id, timeBill);
    editingTimeBills.success(function(data, status, headers, config) {
      // TODO 编辑成功后刷新页面
      $('#timeBillModal').modal('hide');
      _loadDailyTimeBills();
      _loadDailyTypeSummayInfo();
    });
    editingTimeBills.error(function(data, status, headers, config) {
      // TODO 失败后弹窗提示
    })
  }

  /**
   * [showDeleteRecord description]
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  $scope.showConfirmDeleteBill = function(timeBill) {
    $('#deleteBillModal').modal('show');
    $scope.timeBill = timeBill;
  }

  $scope.deleteBill = function(id) {
    $http.delete('api/time-bills/' + id)
      .success(function(data, status, headers, config) {
        $('#deleteBillModal').modal('hide');
        _loadDailyTimeBills();
        _loadDailyTypeSummayInfo();
      })
  }

  function _loadDailyTimeBills() {
    var loadingTimeBills = $http.get('/api/time-bills/daily/' + offset);
    loadingTimeBills.success(function(data, status, headers, config) {
      $scope.timeBills = data;
      var duration = 0;
      var effectiveTotalTime = 0;
      for(var i=0, len=data.length; i<len; i++) {
        duration += data[i].durationTime || 0;
        if(data[i].topTypeId === 1 || data[i].topTypeId === 2) {
          effectiveTotalTime += data[i].durationTime || 0;
        }
      }
      $scope.totalTime = duration;
      $scope.effectiveTotalTime = effectiveTotalTime;
    });
  }

  function _loadDailyTypeSummayInfo() {
    var loadingTypeTimeBills = $http.get('/api/time-bills/type/daily/' + offset);
    loadingTypeTimeBills.success(function(data, status, headers, config) {
      $scope.topTypes = data;
      var maxTypeTime = 0;

      for(var i=0; i<data.length; i++) {
        if(data[i].childrens[0]) {
          maxTypeTime = Math.max(maxTypeTime, data[i].childrens[0].durationTime);
        }
      }
      $scope.maxTypeTime = maxTypeTime;
    });
  }

  $scope.$on('401', function(d,data) {
      $state.go('login');
  });

}]);
