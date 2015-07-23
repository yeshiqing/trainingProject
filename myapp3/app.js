var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var register = require('./routes/register');
var successlogin = require('./routes/successlogin');
var undone = require('./routes/undone');
var successregister = require('./routes/successregister');
// var usertest = require('./routes/usertest');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/register',register);
app.use('/successlogin',successlogin);
app.use('/undone',undone);
app.use('/successregister',successregister);
// app.use('/usertest',usertest);




//数据操作对象
var User = require('./routes/userdata.js');

//模版
app.get('/usertest', function(req, res) {
  User.find(function(err, user) {
    res.render('usertest', {
      user: user
    })
  })
});


//保存数据

app.post('/add', function(req, res) {
  var user = req.body;
   if (!user) {
    console.log(user)
    return
  }
  
  var user = new User(user);
  user.save(function(err){
    if (err) {
      console.log('保存失败')
    }
    console.log('数据保存成功')
  });
  

  return res.redirect('/usertest');
   
 
  // var user = new User(user)
  //   //保存数据
  // user.save(function(err) {
  //   if (err) {
  //     console.log('保存失败')
  //   }
  //   console.log('数据保存成功')
  //   return res.redirect('/')
  // });
});


//修改数据
app.get('/update/:id', function(req, res) {
  var id = req.params.id;
  if (id) {
    //查找指定要修改的数据
    User.findOne({_id: id},function(err,oneUser){
      res.render('usertest', {
         oneUser : oneUser
      })
    })
  }
})

//更新数据
app.post('/update', function(req, res) {
  var id = req.params.id;
  var oneUser = req.body;
  var onuUser_name=req.body.name;
  var oneUser_password = req.body.password;
  
  console.log(oneUser);
  // url = window.location.href;
  // var id =url.substr(-24,24);

  if (!oneUser) {
    return
  }
  User.update({}, {
    $set: {name: onuUser_name,password:oneUser_password}
  }, function(err) {
    if(err){
      console.log(err)
      return
    }
    console.log('更新成功')
    return res.redirect('/usertest')
  });
});


//删除数据
app.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  if (id) {
    User.remove({
      _id: id
    }, function(err) {
      if (err) {
        console.log(err)
        return
      }
      console.log('删除成功')
      return res.redirect('/usertest')
    });
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});








module.exports = app;
