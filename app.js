
/**
 * Module dependencies
 */

var express = require('express'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  flash = require('express-flash'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());
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
app.get('/api/time-bills/daily/:offset', api.loadDailyTimeBills);
app.get('/api/time-bills/type/daily', api.loadDailyTypeSummaryInfo);
app.post('/api/time-bills', api.addTimeBill);
app.put('/api/time-bills/:id', api.editTimeBill);
app.delete('/api/time-bills/:id', api.deleteTimeBill);

app.get('/api/time-bills/daily/week', api.loadWeekDailySummayInfo);
app.get('/api/time-bills/type/week', api.loadWeekTypeSummaryInfo);
app.get('/api/time-bills/daily/month', api.loadMonthDailySummayInfo);
app.get('/api/time-bills/type/month', api.loadMonthTypeSummaryInfo);
app.get('/api/time-bills/daily/year', api.loadYearDailySummayInfo);
app.get('/api/time-bills/type/year', api.loadYearTypeSummaryInfo);

app.get('/api/time-bills/all', api.loadAllTimeBills);

app.get('/api/bill-types', api.billTypes);
app.post('/api/bill-types', api.addBillTypes);
app.put('/api/bill-types/:id', api.editBillTypes);
app.delete('/api/bill-types/:id', api.deleteBillType);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
