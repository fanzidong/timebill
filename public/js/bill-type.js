'use strict';

angular.module('timeBill.billType', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bill-type', {
    templateUrl: 'partials/bill-type',
    controller: 'billTypeContrl'
  });
}])

.controller('billTypeContrl', ['$scope', '$http', function($scope, $http) {
  //获取账单顶级类型
  _loadTopTypes();

  //获取账单类型
  var loadingBillTypes = $http.get('/api/bill-types');
  loadingBillTypes.success(function(data, status, headers, config) {
    $scope.billTypes = data;
  });

  $scope.showAddType = function() {
    $scope.action = 'add';
    $scope.actionName = '添加';
    $scope.billType = {
      topTypeId: 1,
    };
    $('#typeModal').modal('show');
  }

  $scope.showEditType = function(billType) {
    console.log(billType);
    $scope.action = 'edit';
    $scope.actionName = '编辑';
    $scope.billType = billType;
    $('#typeModal').modal('show');
  }

  $scope.saveType = function() {
    var action = $scope.action;
    if(action === 'add') {
      _addType($scope.billType);
    } else if(action === 'edit') {
      _editType($scope.billType);
    }
  }

  function _loadTopTypes() {
    var loadingTopTypes = $http.get('/api/top-types');
    loadingTopTypes.success(function(data, status, headers, config) {
      $scope.topTypes = data;
    });
  }

  function _addType(billType) {
    // 获取要添加的账单名称
    var name = billType.name;

    //判断是否已存在同名账单类型
    var _billTypes = $scope.billTypes,
      exist = false;
    for(var i=0, len=_billTypes.length; i<len; i++) {
      if(_billTypes[i].name === name) {
        exist = true;
        break;
      }
    }
    if(exist) {
      alert('已存在同名类型！');
      return;
    }

    //添加账单类型
    var addingBillTypes = $http.post('/api/bill-types', {
      name: name,
      topTypeId: billType.topTypeId
    });
    addingBillTypes.success(function(data, status, headers, config) {
      // TODO 添加成功后刷新页面
      $('#typeModal').modal('hide');
      var loadingBillTypes = $http.get('/api/bill-types');
      loadingBillTypes.success(function(data, status, headers, config) {
        $scope.billTypes = data;
      });
    });
    addingBillTypes.error(function(data, status, headers, config) {
      // TODO 失败后弹窗提示
      alert(data.msg);
    })
  }

   function _editType(billType) {
    //编辑账单类型
    var editingBillTypes = $http.put('/api/bill-types/' + billType.id, {
      name: billType.name,
      topTypeId: billType.topTypeId
    });
    editingBillTypes.success(function(data, status, headers, config) {
      // TODO 编辑成功后刷新页面
      $('#typeModal').modal('hide');
      var loadingBillTypes = $http.get('/api/bill-types');
      loadingBillTypes.success(function(data, status, headers, config) {
        $scope.billTypes = data;
      });
    });
    editingBillTypes.error(function(data, status, headers, config) {
      // TODO 失败后弹窗提示
    })
  }

  $scope.showDeleteConfirm = function(billType) {
    $('#deletetypeModal').modal('show');
    $scope.billType = billType;
  }

  $scope.deleteType = function(typeId) {
    $http.delete('api/bill-types/' + typeId)
      .success(function(data, status, headers, config) {
        $('#deletetypeModal').modal('hide');
        var loadingBillTypes = $http.get('/api/bill-types');
        loadingBillTypes.success(function(data, status, headers, config) {
          $scope.billTypes = data;
        });
      })
  }

}]);
