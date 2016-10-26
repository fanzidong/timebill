
/**
 * Module dependencies
 */

var express = require('express'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  flash = require('express-flash'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  crypto = require('crypto');

var app = module.exports = express();

var User = require('./model/User.js');


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(cookieParser());
app.use(session({
  secret: 'timebillsession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';


// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.post('/login', function(req, res) {
  User.getUserByName(req.body.username, function(err, user) {
    var md5 = crypto.createHash('md5');
    md5.update(req.body.password + user.username);
    var _pwd = md5.digest('hex');
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else if(_pwd != user.password) {
      res.status(500).json({
        msg: '密码错误'
      });
    } else {
      req.session.user=user;
      res.json({
        user: {
          username: user.username,
          id: user.id
        },
        msg: '登录成功'
      });
    }
  })
});

app.post('/logout', function(req, res) {
  req.session.user = null;
  res.json({
    msg: '退出成功'
  });
});

app.post('/api/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var md5 = crypto.createHash('md5');
  md5.update(password + username);
  var _pwd = md5.digest('hex');

  //生成用户
  var user = new User(null, username, _pwd);
  user.save(function(err) {
    if(err) {
      res.status(500).json({
        msg: err
      });
    } else {
      res.json({
        msg: '注册成功'
      });
    }
  });

});

//app.all('api/time-bills/*', isLoggedIn);
//app.get('/api/time-bills/daily/:offset', isLoggedIn);
app.get('/api/time-bills/daily/:offset', isLoggedIn, api.loadDailyTimeBills);
app.get('/api/time-bills/type/daily/:offset', isLoggedIn, api.loadDailyTypeSummaryInfo);
app.post('/api/time-bills', isLoggedIn, api.addTimeBill);
app.put('/api/time-bills/:id', isLoggedIn, api.editTimeBill);
app.delete('/api/time-bills/:id', isLoggedIn, api.deleteTimeBill);

app.get('/api/time-bills/week/:offset', isLoggedIn, api.loadWeekDailySummayInfo);
app.get('/api/time-bills/type/week/:offset', isLoggedIn, api.loadWeekTypeSummaryInfo);
app.get('/api/time-bills/month/:offset', isLoggedIn, api.loadMonthDailySummayInfo);
app.get('/api/time-bills/type/month/:offset', isLoggedIn, api.loadMonthTypeSummaryInfo);
app.get('/api/time-bills/year/:offset', isLoggedIn, api.loadYearDailySummayInfo);
app.get('/api/time-bills/type/year/:offset', isLoggedIn, api.loadYearTypeSummaryInfo);

app.get('/api/time-bills/all', isLoggedIn, api.loadAllTimeBills);

app.get('/api/top-types', isLoggedIn, api.loadTopTypes);
app.get('/api/bill-types', isLoggedIn, api.billTypes);
app.post('/api/bill-types', isLoggedIn, api.addBillTypes);
app.put('/api/bill-types/:id', isLoggedIn, api.editBillTypes);
app.delete('/api/bill-types/:id', isLoggedIn, api.deleteBillType);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    req.session.error = 'Access Deined';
    res.send(401);
  }
}

/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
