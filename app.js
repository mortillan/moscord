const dotenv = require('dotenv');
const path = require('path');

//read config to ENV OS variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const database = require('./libs/database');

const app = express();

database().then(_ => app.emit('db-connected'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get('/', (req, res) => res.json({message: 'Moscord Coding Challenge'}));
app.use('/sellers', require('./routes/seller'));
app.use('/products', require('./routes/product'));
app.use('/carts', require('./routes/cart'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return res.status(404).end()
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
