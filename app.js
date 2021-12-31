const createError = require('http-errors');
const express = require('express');
const session = require('express-session')
const hbs = require('hbs');
const path = require('path');
const config = require('config')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactRouter = require('./routes/contact');
const aboutRouter = require('./routes/about');
const productRouter = require('./routes/product');
const addProductRouter = require('./routes/addProduct');
const categoryRouter = require('./routes/category');
const shoppingBagRouter = require('./routes/shopingBag');
 
const app = express();

// view engine setup
hbs.registerPartials(path.join(__dirname , "views" , "partials"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json({limit : "10mb" ,      extended : true}) );
app.use(express.urlencoded({limit : "10mb" , extended : true}) );
app.use(cookieParser());
app.use(session({
  secret: config.get('dssGroups'),
  resave: true,
  saveUninitialized: false,     
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use("/product/:id", express.static(path.join(__dirname, 'public')));
app.use("/add/:id", express.static(path.join(__dirname, 'public')));
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/product', productRouter);
app.use('/add', addProductRouter);
app.use('/category', categoryRouter);
app.use('/bag', shoppingBagRouter);

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
