var db = require('../db/db.js');
var util = require('util');

var TopType = function(id, name) {
  this.id = id;
  this.name = name;
}

TopType.loadAllTypes = function(callback) {
  db.exec('SELECT * FROM toptype ORDER BY id asc', [], function(err, rows) {
    if(err) {
      callback(err);
      return;
    }
    callback(err, rows);
  });
}

module.exports = TopType;
