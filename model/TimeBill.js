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
  this.userId = options.userId;
}

TimeBill.loadTimeBills = function(data, callback) {
  var querySql = 'SELECT timebill.*, billtype.`name` typeName, billtype.toptypeId topTypeId FROM timebill LEFT JOIN billtype ON timebill.typeId=billtype.id WHERE 1=1';
  if(data.startTime) {
    querySql += ' AND startTime >= "' + data.startTime + '"';
  }
  if(data.endTime) {
    querySql += ' AND startTime <= "' + data.endTime + '"';
  }
  querySql += ' AND timebill.userId =' + data.userId;
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
      saveSql = util.format('INSERT INTO timebill(detail, startTime, endTime, durationTime, typeId, userId) VALUES("%s", "%s", "%s", %d, %d, %d)',
        this.detail, this.startTime, this.endTime, this.durationTime, this.typeId, this.userId);
    } else {
      saveSql = util.format('INSERT INTO timebill(detail, startTime, typeId, userId) VALUES("%s", "%s", %d, %d)',
        this.detail, this.startTime, this.typeId, this.userId);
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
  var querySql = 'SELECT DATE_FORMAT(A.startTime, "%Y-%m-%d") date, SUM(A.durationTime) durationTime, SUM(CASE WHEN B.toptypeId IN (1,2) THEN A.durationTime ELSE 0 END) effectiveTime FROM timebill A LEFT JOIN billtype B ON A.typeId=B.id';
  querySql += ' WHERE A.userId = ' + data.userId + ' AND startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY date ORDER BY date';
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
};

TimeBill.getWeekSummayInfo = function(data, callback) {
  var querySql = 'SELECT DATE_FORMAT(A.date, "%Y-%u") name, A.date weekStartDay, SUM(A.dailyTime) durationTime, SUM(A.effectiveTime) effectiveTime, COUNT(*) dayNum FROM (SELECT DATE_FORMAT(A.startTime, "%Y-%m-%d") date, SUM(A.durationTime) dailyTime, SUM(CASE WHEN B.toptypeId IN (1,2) THEN A.durationTime ELSE 0 END) effectiveTime FROM timebill A LEFT JOIN billtype B ON A.typeId=B.id';
  querySql += ' WHERE A.userId = ' + data.userId + ' AND startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY date) A GROUP BY name';
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
};

TimeBill.getMonthSummayInfo = function(data, callback) {
  var querySql = 'SELECT DATE_FORMAT(A.date, "%Y-%m") name, SUM(A.dailyTime) durationTime, SUM(A.effectiveTime) effectiveTime, COUNT(*) dayNum FROM (SELECT DATE_FORMAT(A.startTime, "%Y-%m-%d") date, SUM(A.durationTime) dailyTime, SUM(CASE WHEN B.toptypeId IN (1,2) THEN A.durationTime ELSE 0 END) effectiveTime FROM timebill A LEFT JOIN billtype B ON A.typeId=B.id';
  querySql += ' WHERE A.userId = ' + data.userId + ' AND startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY date) A GROUP BY name';
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
};

TimeBill.getTypeSummaryInfo = function(data, callback) {
  var querySql = 'SELECT typeSummary.*, topTypeSummary.topTypeName, topTypeSummary.durationTime topDurationTime';
  querySql += ' FROM (SELECT B.id typeId, B.name typeName, SUM(A.durationTime) durationTime, C.id topTypeId FROM timebill A LEFT JOIN billtype B ON A.typeId=B.id LEFT JOIN toptype C ON B.toptypeId=C.id';
  querySql += ' WHERE A.userId = ' + data.userId + ' AND startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY typeId ORDER BY topTypeId ASC, durationTime DESC) typeSummary';
  querySql += ' LEFT JOIN (SELECT C.id topTypeId, C.name topTypeName, SUM(A.durationTime) durationTime FROM timebill A LEFT JOIN billtype B ON A.typeId=B.id LEFT JOIN toptype C ON B.toptypeId=C.id';
  querySql += ' WHERE A.userId = ' + data.userId + ' AND startTime BETWEEN "' + data.startTime + '" AND "' + data.endTime + '"';
  querySql += ' GROUP BY topTypeId ORDER BY topTypeId ASC) topTypeSummary ON typeSummary.topTypeId=topTypeSummary.topTypeId';

  db.exec(querySql, [], function(err, rows) {
    if(err) {
      callback(err);
    } else {
      console.log(rows)
      callback(err, assembleTypes(rows));
    }
  });
};

function assembleTypes(rows) {
  var topTypes = {},
    row,
    topTypeId,
    topType;
  for(var i=0,len=rows.length; i<len; i++) {
    var row = rows[i],
      topTypeId = row.topTypeId;
    if(topTypes[topTypeId]) {
      topType = topTypes[topTypeId];
    }else {
      topType = {
        id: topTypeId,
        name: row.topTypeName,
        durationTime: row.topDurationTime,
        childrens: []
      };
      topTypes[topTypeId] = topType;
    }
    topType.childrens.push({
      id: row.typeId,
      name: row.typeName,
      durationTime: row.durationTime
    });
  }
  var topTypeArr = [];
  for(var key in topTypes) {
    topTypeArr.push(topTypes[key]);
  }
  return topTypeArr;
}

module.exports = TimeBill;
