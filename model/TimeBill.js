var db = require('../db/db.js');
var util = require('util');
var moment = require('moment');

var TimeBill = function(options) {
  this.id = options.id;
  this.detail = options.detail;
  this.startTime = options.startTime ? moment(options.startTime).format('YYYY-MM-DD HH:mm') : null;
  this.endTime = options.endTime ? moment(options.endTime).format('YYYY-MM-DD HH:mm') : null;
  this.durationTime = options.durationTime || 0;
  this.typeId = options.typeId;
  this.typeName = options.typeName;
}

TimeBill.loadTimeBills = function(data, callback) {
  var querySql = 'SELECT timebill.*, billtype.`name` typeName FROM timebill LEFT JOIN billtype ON timebill.typeId=billtype.id WHERE 1=1';
  if(data.startTime) {
    querySql += ' AND startTime >= "' + data.startTime + '"';
  }
  if(data.endTime) {
    querySql += ' AND startTime <= "' + data.endTime + '"';
  }
  querySql += ' ORDER BY startTime asc';
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
}

TimeBill.prototype.save = function(callback) {
  var me = this;
  var saveSql;

  if(this.id) {
    saveSql = util.format('UPDATE timebill SET detail="%s", startTime="%s", endTime="%s", durationTime=%d, typeId=%d WHERE id=%d',
      this.detail, this.startTime, this.endTime, this.durationTime, this.typeId, this.id);
  } else {
    if(this.endTime) {
      saveSql = util.format('INSERT INTO timebill(detail, startTime, endTime, durationTime, typeId) VALUES("%s", "%s", "%s", %d, %d)',
        this.detail, this.startTime, this.endTime, this.durationTime, this.typeId);
    } else {
      saveSql = util.format('INSERT INTO timebill(detail, startTime, typeId) VALUES("%s", "%s", %d)',
        this.detail, this.startTime, this.typeId);
    }
  }

  db.exec(saveSql, [], function(err, rows) {
    callback(err);
  });
}

TimeBill.prototype.delete = function(callback) {
  var deleteSql = util.format('DELETE FROM timebill WHERE id=%d', this.id);
  db.exec(deleteSql, [], function(err, rows) {
    callback(err);
  });
};

TimeBill.getDailySummayInfo = function(data, callback) {
  var querySql = 'SELECT DATE_FORMAT(A.startTime, "%Y-%m-%d") date, SUM(A.durationTime) dailyTime FROM timebill A';
  querySql += ' WHERE startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY date ORDER BY date';
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
};

TimeBill.getMonthSummayInfo = function(data, callback) {
  var querySql = 'SELECT DATE_FORMAT(A.date, "%Y-%m") name, SUM(A.dailyTime) durationTime, COUNT(*) dayNum FROM (SELECT DATE_FORMAT(A.startTime, "%Y-%m-%d") date, SUM(A.durationTime) dailyTime FROM timebill A';
  querySql += ' WHERE startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY date) A GROUP BY name';
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
};

TimeBill.getTypeSummaryInfo = function(data, callback) {
  var querySql = 'SELECT B.name typeName, SUM(A.durationTime) dailyTime FROM timebill A LEFT JOIN billtype B ON A.typeId=B.id';
  querySql += ' WHERE startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY typeId ORDER BY dailyTime DESC';
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
};

module.exports = TimeBill;
