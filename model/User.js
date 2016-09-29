var db = require('../db/db.js');
var util = require('util');

var User = function(id, username, password) {
  this.id = id;
  this.username = username;
  this.password = password;
}

User.prototype.save = function(callback) {
  var me = this;
  var saveSql;

  if(this.id) {
    saveSql = util.format('UPDATE users SET password=%s WHERE id=%d', this.password, this.id);
  } else {
    saveSql = util.format('INSERT INTO users(`username`, password) VALUES("%s", "%s")', this.username, this.password);
  }

  db.exec(saveSql, [], function(err, rows) {
    callback(err);
  });
}

User.prototype.delete = function(callback) {
  var deleteSql = util.format('DELETE FROM users WHERE id=%d', this.id);
  db.exec(deleteSql, [], function(err, rows) {
    callback(err);
  });
};

User.loadAllUsers = function(callback) {
  db.exec('SELECT * FROM users', [], function(err, rows) {
    if(err) {
      callback(err);
      return;
    }
    callback(err, rows);
  });
};

User.getUserByName = function(username, callback) {
  var querySql = util.format('SELECT * FROM users WHERE username="%s"', username);
  db.exec(querySql, [], function(err, rows) {
    if(err) {
      callback(err);
      return;
    }
    if(rows.length == 0) {
      callback('不存在该用户');
      return;
    }
    callback(err, rows[0]);
  });
};

module.exports = User;
