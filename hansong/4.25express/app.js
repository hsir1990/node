var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 需要在应用中进行如下设置才能让 Express 渲染模板文件：

// views, 放模板文件的目录，比如： app.set('views', './views')
// view engine, 模板引擎，比如： app.set('view engine', 'jade')

app.set('view', path.join(__dirname, 'public'))
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 控制静态文件,通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
app.use(express.static(path.join(__dirname, 'public')));
// 指定一个挂载路径的方式
app.use('/static', express.static(path.join(__dirname, 'files')))


// // get请求
// app.get('/get', (req, res) => {
//   res.send('get请求发送');
// })

// app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。
// 在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。
app.all('all', (req, res, next) => {
  console.log('通过');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。这是因为 404 只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件。如下：
// app.use(function(req, res, next) {
//   res.status(404).send('Sorry cant find that!');
// });
app.use(function(req, res, next) {
  next(createError(404));
});

// 如何设置一个错误处理器？
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('something broke!')
})

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
