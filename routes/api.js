/*
 * Serve JSON to our AngularJS client
 */
var BillType = require('../model/BillType.js');
var TimeBill = require('../model/TimeBill.js');

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
    startTime: '2016-08-29 00:00:00',
    endTime: '2016-08-29 23:59:59'
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
