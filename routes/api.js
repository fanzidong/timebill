/*
 * Serve JSON to our AngularJS client
 */
var db = require('../db/db.js');

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.billTypes = function(req, res) {
  db.exec('SELECT * FROM billtype', [], function(err, rows) {
    if(err) {
      return;
    }
    res.json(rows);
  });
}
