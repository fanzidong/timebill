var db = require('../db/db.js');
var util = require('util');

var BillType = function(id, name, topTypeId) {
  this.id = id;
  this.name = name;
  this.topTypeId = topTypeId;
}

BillType.prototype.save = function(callback) {
  var me = this;
  var saveSql;

  if(this.id) {
    saveSql = util.format('UPDATE billtype SET name="%s", topTypeId=%d WHERE id=%d', this.name, this.topTypeId, this.id);
  } else {
    saveSql = util.format('INSERT INTO billtype(`name`, topTypeId) VALUES("%s", %d)', this.name, this.topTypeId);
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
  db.exec('SELECT billtype.id, billtype.name, billtype.toptypeId topTypeId, toptype.name topTypeName FROM billtype LEFT JOIN toptype ON billtype.toptypeId=toptype.id ORDER BY toptype.id asc, billtype.id asc', [], function(err, rows) {
    if(err) {
      callback(err);
      return;
    }
    callback(err, rows);
  });
}

module.exports = BillType;
