var express = require('express');
var router = express.Router();
var User = require('../routes/userdata.js');

router.get('/', function(req, res, next) {
	User.find(function(err, user) {
    res.render('register', {
      user: user,title:'注册'})
  })
  
});



router.post('/add', function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	var repass = req.body.repassword;
	var result = validate(username);

	if(password !== repass){
		res.send('密码不一致');
	}

	
   if (!username) {
    res.send('用户名不能为空');    
  }
  
	var user = new User({name:username,password:password});
	user.save(function(err){
    if (err) {
      console.log('保存失败')
    }
    console.log('数据保存成功')
	})
	
	return res.redirect('/successregister');

});



router.get('/getUser', function (req, res, next) {
	var username = req.query.username;

	var result =  validate(username);

	res.json({isValid: result});
});


function validate(username){
	var list = ['byron', 'casper', 'vincent'];

	if(list.indexOf(username) > -1 ){
		return false
	}

	return true;
}

module.exports = router;