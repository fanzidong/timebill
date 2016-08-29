var db = require('../db/db.js');
var util = require('util');

var BillType = function(id, name) {
  this.id = id;
  this.name = name;
}

BillType.prototype.save = function(callback) {
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

BillType.prototype.delete = function(callback) {
  var deleteSql = util.format('DELETE FROM billtype WHERE id=%d', this.id);
  db.exec(deleteSql, [], function(err, rows) {
    callback(err);
  });
};

BillType.loadAllBillTypes = function(callback) {
  db.exec('SELECT * FROM billtype', [], function(err, rows) {
    if(err) {
      callback(err);
      return;
    }
    callback(err, rows);
  });
}

module.exports = BillType;
