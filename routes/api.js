/*
 * Serve JSON to our AngularJS client
 */
var User = require('../model/User.js');
var BillType = require('../model/BillType.js');
var TopType = require('../model/TopType.js');
var TimeBill = require('../model/TimeBill.js');
var moment = require('moment');

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.loadTopTypes = function(req, res) {
  TopType.loadAllTypes(function(err, rows) {
    if(err) {
      return;
    }
    res.json(rows);
  });
};

exports.billTypes = function(req, res) {
  BillType.loadAllBillTypes({
    userId: req.session.user.id
  }, function(err, rows) {
    if(err) {
      return;
    }
    res.json(rows);
  });
};

exports.addBillTypes = function(req, res) {
  var billType = new BillType(null, req.body.name, req.body.topTypeId);
  billType.userId = req.session.user.id;
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
  var billType = new BillType(req.params.id, req.body.name, req.body.topTypeId);
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

exports.loadDailyTimeBills = function(req, res) {
  var today = moment(),
    offset = req.params.offset,
    queryDay = today.add(offset, 'd');
  TimeBill.loadTimeBills({
    userId: req.session.user.id,
    startTime: queryDay.format('YYYY-MM-DD 00:00:00'),
    endTime: queryDay.format('YYYY-MM-DD 23:59:59')
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

exports.loadDailyTypeSummaryInfo = function(req, res) {
  var today = moment(),
    offset = req.params.offset,
    queryDay = today.add(offset, 'd');
  TimeBill.getTypeSummaryInfo({
    userId: req.session.user.id,
    startTime: queryDay.format('YYYY-MM-DD 00:00:00'),
    endTime: queryDay.format('YYYY-MM-DD 23:59:59')
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

exports.loadAllTimeBills = function(req, res) {
  TimeBill.loadTimeBills({
    userId: req.session.user.id
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

exports.addTimeBill = function(req, res) {
  var timeBill = new TimeBill(req.body);
  timeBill.userId = req.session.user.id;
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
  var today = moment(),
    offset = req.params.offset,
    queryWeekDay = today.add(offset, 'w');
  TimeBill.getDailySummayInfo({
    userId: req.session.user.id,
    startTime: queryWeekDay.startOf('isoWeek').format('YYYY-MM-DD 00:00:00'),
    endTime: queryWeekDay.endOf('isoWeek').format('YYYY-MM-DD 23:59:59')
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
  var today = moment(),
    offset = req.params.offset,
    queryWeekDay = today.add(offset, 'w');

  TimeBill.getTypeSummaryInfo({
    userId: req.session.user.id,
    startTime: queryWeekDay.startOf('isoWeek').format('YYYY-MM-DD 00:00:00'),
    endTime: queryWeekDay.endOf('isoWeek').format('YYYY-MM-DD 23:59:59')
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
  var today = moment(),
    offset = req.params.offset,
    queryMonth = today.add(offset, 'M');

  TimeBill.getWeekSummayInfo({
    userId: req.session.user.id,
    startTime: queryMonth.startOf('month').format('YYYY-MM-DD 00:00:00'),
    endTime: queryMonth.endOf('month').format('YYYY-MM-DD 23:59:59')
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
  var today = moment(),
    offset = req.params.offset,
    queryMonth = today.add(offset, 'M');

  TimeBill.getTypeSummaryInfo({
    userId: req.session.user.id,
    startTime: queryMonth.startOf('month').format('YYYY-MM-DD 00:00:00'),
    endTime: queryMonth.endOf('month').format('YYYY-MM-DD 23:59:59')
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
  var today = moment(),
    offset = req.params.offset,
    queryYear = today.add(offset, 'Y');

  TimeBill.getMonthSummayInfo({
    userId: req.session.user.id,
    startTime: queryYear.startOf('year').format('YYYY-MM-DD 00:00:00'),
    endTime: queryYear.endOf('year').format('YYYY-MM-DD 23:59:59')
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
    userId: req.session.user.id,
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
