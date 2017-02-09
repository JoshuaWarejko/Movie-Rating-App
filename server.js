var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var rootDir = require('app-root-path').path;

app = module.exports = express();

// Load Libs
var MongoConnection = require(rootDir + '/config/mongo')(app).connection;

// mongodb connection
mongoose.connect(MongoConnection.uri, MongoConnection.db, MongoConnection.port, MongoConnection.credentials);
var db = mongoose.connection;

// Setup Auth Sessions
app.use(session({
  secret: '!aAFLL%1WQPp',
  store: new MongoStore({ mongooseConnection: db }),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: false }
}));

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set CORS policy
app.use('*', function(req, res, next) {
  var allowedOrigins = [
    'http://localhost:3010'
  ];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  }
  next();
});

app.use(favicon(path.join(__dirname, 'www/img', 'movie.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use('/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/movie-track', require('./routes/movie_tracks'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/movie-search', require('./routes/movie_search'));

// development error handler
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.locals.title = "Page Not Found | Movie Rating App";
  var err = new Error('Sorry, the page or file you are looking for does not exist.');
  err.status = 404;
  err.name = 'Not Found';
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.name = err.name;
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.url = req.protocol + '://' + req.get("host") + req.originalUrl;
  // res.locals.stack = req.app.get('env') === 'development' ? err.stack : null;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(res.locals);
  res.render('error');

});


module.exports = app;
