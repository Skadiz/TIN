var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const indexRouter = require('./routes/index');
const guestsRouter = require('./routes/guestsRoute');
const reservationRouter = require('./routes/reservationRoute');
const roomsRouter = require('./routes/roomsRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/guests', guestsRouter);
app.use('/rooms', roomsRouter);
app.use('/reservation', reservationRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const guestApiRouter = require('./routes/api/GuestApiRoute');
app.use('/api/guests', guestApiRouter);

const roomApiRouter = require('./routes/api/RoomApiRoute');
app.use('/api/rooms', roomApiRouter);

const reservationApiRouter = require('./routes/api/ReservationApiRoute');
app.use('/api/reservation', reservationApiRouter);
module.exports = app;
