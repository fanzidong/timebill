var mysql = require('mysql');

// 数据库连接信息
var db_host = '127.0.0.1';
var db_port = 3306;
var db_name = 'timebill';
var username = 'fanzidong';
var password = 'fanzidong';

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : db_host,
  user            : username,
  password        : password,
  database        : db_name,
  port: db_port
});

var option = {
  host: db_host,
  port: db_port,
  user: username,
  password: password,
  database: db_name
};

exports.exec = function(sqls, data, callback) {
  //var client = mysql.createConnection(option);
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log('[connection error]: ' + err);
      return;
    }
    connection.query(sqls || '', data || [], function(err, rows) {
      callback(err, rows);
    })
    connection.release();
  });

  // client.connect(function(err) {
  //   if(err) {
  //     console.log('[connection error]: ' + err);
  //     return;
  //   }
  //   client.query(sqls || '', data || [], function(err, rows) {
  //     callback(err, rows);
  //   })
  //   client.end();
  // });
  //
  // client.on('error', function(err) {
  //   callback("error", false);
  //   throw err;
  // });
}
