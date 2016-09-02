'use strict';

angular.module('timeBill.today', ['ngRoute', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/today', {
    templateUrl: 'partials/today',
    controller: 'todayContrl'
  });
}])

.controller('todayContrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  // 加载所有账单类型
  var loadingBillTypes = $http.get('/api/bill-types');
  loadingBillTypes.success(function(data, status, headers, config) {
    $scope.billTypes = data;

    var typeMap = {};
    $.each(data, function(i, billType) {
      typeMap[billType.id] = billType.name;
    });
    $scope.typeMap = typeMap;
  });

  //获取今天的流水记录
  var loadingTimeBills = $http.get('/api/time-bills/today');
  loadingTimeBills.success(function(data, status, headers, config) {
    $scope.timeBills = data;
    _summaryBills(data);
  });

  $scope.today = new Date();

  $scope.hasDone = function(timeBill) {
    return !!timeBill.endTime;
  }

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
      var loadingTimeBills = $http.get('/api/time-bills/today');
      loadingTimeBills.success(function(data, status, headers, config) {
        $scope.timeBills = data;
      });
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
      var loadingTimeBills = $http.get('/api/time-bills/today');
      loadingTimeBills.success(function(data, status, headers, config) {
        $scope.timeBills = data;
      });
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
        var loadingTimeBills = $http.get('/api/time-bills/today');
        loadingTimeBills.success(function(data, status, headers, config) {
          $scope.timeBills = data;
        });
      })
  }

  function _summaryBills(timeBills) {
    var map = {},
      total = 0;
    $.each(timeBills, function(i, timeBill) {
      total += timeBill.durationTime;
      if(map[timeBill.typeId]) {
        map[timeBill.typeId] += timeBill.durationTime;
      } else {
        map[timeBill.typeId] =  timeBill.durationTime;
      }
    });

    var list = [];

    for(var typeId in map) {
      list.push({
        typeId: typeId,
        durationTime: map[typeId],
        percent: map[typeId] * 100 / total
      });
    }
    list.sort(function(a, b) {
      return b.durationTime - a.durationTime;
    });

    $scope.totalDuration = total;
    $scope.summaryData = list;
  }

  $scope.getBillTypeNameById = function(typeId) {
    console.log($scope.typeMap);
    return $scope.typeMap[typeId] || '未分类';
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
