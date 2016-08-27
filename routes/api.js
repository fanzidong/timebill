/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.billTypes = function(req, res) {
  var billTypes = [{
    id: 1,
    name: '阅读'
  }, {
    id: 2,
    name: '编码'
  }, {
    id: 3,
    name: '看电影'
  }, {
    id: 4,
    name: '带娃'
  }, {
    id: 5,
    name: '编码外工作'
  }, {
    id: 6,
    name: '学习'
  }];
  res.json(billTypes);
}
