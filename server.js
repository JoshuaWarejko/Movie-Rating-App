var express        = require('express'),
    path           = require('path'),
    favicon        = require('serve-favicon'),
    logger         = require('morgan'),
    sassMiddleware = require('node-sass-middleware'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    session        = require('express-session'),
    MongoStore     = require('connect-mongo')(session);

// Create App
app = module.exports = express();

// Load Libs
var MongoConnection = require('./config/mongo').connection;

app.use(logger('dev'));

// mongodb connection
mongoose.connect(MongoConnection.uri, MongoConnection.db, MongoConnection.port, MongoConnection.credentials);
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set CORS policy
app.use('*', function(req, res, next) {
  var allowedOrigins = [
    'http://localhost:3000'
  ];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  }
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
if (app.get('env') !== 'development') {
  app.use(sassMiddleware({
    root: __dirname,
    src: 'www/scss',
    dest: 'www/assets',
    outputStyle: 'compressed',
    indentedSyntax: false,
    sourceMap: true,
    prefix: '/assets',
    debug: false
  }));
}

// Setup Public Directory
app.use(express.static(path.join(__dirname, 'www')));


// API Routes
var index = require('./routes/index');
var users = require('./routes/users');
app.use('/', index);
app.use('/users', users);


/*
 * error handlers
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Sorry, the page or file you are looking for does not exist.');
  err.status = 404;
  err.name = 'Page Not Found';
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (req.xhr) {
      res.json(err);
    } else {
      res.render('error', {
        title: err.name,
        message: err.message,
        status: err.status,
        stack: JSON.stringify(err.stack),
        env: app.get('env')
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (req.xhr) {
      res.json(err);
  } else {
    res.render('error', {
      title: err.name,
      message: err.message,
      status: err.status,
      env: app.get('env')
    });
  }
});


module.exports = app;
