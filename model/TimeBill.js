var db = require('../db/db.js');
var util = require('util');

var TimeBill = function(options) {
  this.id = options.id;
  this.detail = options.detail;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
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
console.log(querySql);
  db.exec(querySql, [], function(err, rows) {
    callback(err, rows);
  });
}

TimeBill.prototype.save = function(callback) {
  var me = this;
  var saveSql;

  if(this.id) {
    saveSql = util.format('UPDATE billtype SET name="%s" WHERE id=%d', this.name, this.id);
  } else {
    saveSql = util.format('INSERT INTO billtype(`name`) VALUES("%s")', this.name);
  }

  db.exec(saveSql, [], function(err, rows) {
    callback(err);
  });
}

TimeBill.prototype.delete = function(callback) {
  var deleteSql = util.format('DELETE FROM billtype WHERE id=%d', this.id);
  db.exec(deleteSql, [], function(err, rows) {
    callback(err);
  });
};

module.exports = TimeBill;
