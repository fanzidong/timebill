var db = require('../db/db.js');
var util = require('util');
var moment = require('moment');

var TimeBill = function(options) {
  this.id = options.id;
  this.detail = options.detail;
  this.startTime = options.startTime && moment(options.startTime).format('YYYY-MM-DD HH:mm');
  this.endTime = options.endTime && moment(options.endTime).format('YYYY-MM-DD HH:mm');
  this.durationTime = options.durationTime;
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
console.log(querySql);
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
    saveSql = util.format('INSERT INTO timebill(detail, startTime, endTime, durationTime, typeId) VALUES("%s", "%s", "%s", %d, %d)',
      this.detail, this.startTime, this.endTime, this.durationTime, this.typeId);
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

module.exports = TimeBill;
