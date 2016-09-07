'use strict';

/* Filters */

angular.module('timeBill.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }).
  filter('colorBillType', function () {
    var classes = ['primary', 'success', 'info', 'warning', 'danger'];
    return function (typeId) {
      return classes[typeId % 5];
    };
  }).
  filter('getProgressColorByRank', function () {
    return function (rank) {
      if(rank == 0) {
        return "danger";
      } else if (rank == 1) {
        return "warning";
      } else if (rank == 2) {
        return "success";
      } else {
        return "info"
      }
    };
  }).
  filter('formatDurationTime', function () {
    return function (durationTime) {
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
    };
  });
