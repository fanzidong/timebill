/*
 * Serve JSON to our AngularJS client
 */
var BillType = require('../model/BillType.js');
var TimeBill = require('../model/TimeBill.js');
var moment = require('moment');

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.billTypes = function(req, res) {
  BillType.loadAllBillTypes(function(err, rows) {
    if(err) {
      return;
    }
    res.json(rows);
  });
};

exports.addBillTypes = function(req, res) {
  var billType = new BillType(null, req.body.name);
  billType.save(function(err) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    }else {
      res.json({
        msg: '添加成功'
      });
    }
  });
};

exports.editBillTypes = function(req, res) {
  var billType = new BillType(req.params.id, req.body.name);
  billType.save(function(err) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    }else {
      res.json({
        msg: '编辑成功'
      });
    }
  });
}

exports.deleteBillType = function(req, res) {
  var billType = new BillType(req.params.id, null);
  billType.delete(function(err) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    }else {
      res.json({
        msg: '删除成功'
      });
    }
  });
};

exports.loadTodayTimeBills = function(req, res) {
  TimeBill.loadTimeBills({
    startTime: moment().format('YYYY-MM-DD 00:00:00'),
    endTime: moment().format('YYYY-MM-DD 23:59:59')
  }, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
};

exports.loadAllTimeBills = function(req, res) {
  TimeBill.loadTimeBills({}, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
};

exports.addTimeBill = function(req, res) {
  var timeBill = new TimeBill(req.body);
  timeBill.save(function(err) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    }else {
      res.json({
        msg: '添加成功'
      });
    }
  });
}

exports.editTimeBill = function(req, res) {
  var timeBill = new TimeBill(req.body);
  timeBill.save(function(err) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    }else {
      res.json({
        msg: '编辑成功'
      });
    }
  });
}

exports.deleteTimeBill = function(req, res) {
  var timeBill = new TimeBill({
    id: req.params.id
  });
  timeBill.delete(function(err) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    }else {
      res.json({
        msg: '删除成功'
      });
    }
  });
}

exports.loadWeekDailySummayInfo = function(req, res) {
  TimeBill.getDailySummayInfo({
    startTime: moment().startOf('isoWeek').format('YYYY-MM-DD 00:00:00'),
    endTime: moment().endOf('isoWeek').format('YYYY-MM-DD 23:59:59')
  }, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.loadWeekTypeSummaryInfo = function(req, res) {
  TimeBill.getTypeSummaryInfo({
    startTime: moment().startOf('isoWeek').format('YYYY-MM-DD 00:00:00'),
    endTime: moment().endOf('isoWeek').format('YYYY-MM-DD 23:59:59')
  }, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.loadMonthDailySummayInfo = function(req, res) {
  TimeBill.getDailySummayInfo({
    startTime: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    endTime: moment().endOf('month').format('YYYY-MM-DD 23:59:59')
  }, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.loadMonthTypeSummaryInfo = function(req, res) {
  TimeBill.getTypeSummaryInfo({
    startTime: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    endTime: moment().endOf('month').format('YYYY-MM-DD 23:59:59')
  }, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.loadYearDailySummayInfo = function(req, res) {
  TimeBill.getMonthSummayInfo({
    startTime: moment().startOf('year').format('YYYY-MM-DD 00:00:00'),
    endTime: moment().endOf('year').format('YYYY-MM-DD 23:59:59')
  }, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.loadYearTypeSummaryInfo = function(req, res) {
  TimeBill.getTypeSummaryInfo({
    startTime: moment().startOf('year').format('YYYY-MM-DD 00:00:00'),
    endTime: moment().endOf('year').format('YYYY-MM-DD 23:59:59')
  }, function(err, rows) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json(rows);
    }
  });
}
