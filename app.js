var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors')

var indexRouter = require('./routes/index');
var adminUsersRouter = require('./routes/admin/users');
var upload = require('./routes/upload');
var uploader = require('./routes/uploader');

var adminSingersRouter = require('./routes/admin/singers');
var adminAlbumsRouter = require('./routes/admin/albums');
var adminSongsRouter = require('./routes/admin/songs');

var imgrouter = require('./imgrouter');




var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/admin/singers', adminSingersRouter);
app.use('/admin/albums', adminAlbumsRouter);
app.use('/admin/songs', adminSongsRouter);
app.use('/img', imgrouter);

app.use('/admin/users', adminUsersRouter);
app.use('/upload', upload);
app.use('/uploader', uploader);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
