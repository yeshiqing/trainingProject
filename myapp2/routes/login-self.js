var express = require('express');

var router = express.Router();
var list = ['byron','1','11','page2','page3'];


router.get('/',function(req,res,next){
	res.render('login-self',{title:'The form powered by express'});
});


router.post('/',function(req,res,next){
	var username = req.body.username;
	var password1 = req.body.password1;
	var password2 = req.body.password2;

	if(username && password1 && password2 && password1===password2){
		res.send('恭喜你注册成功');
		list.push(username);
		res.end();
	}else{
		res.send('error');
	}
	

});

router.get('/repeat',function(req,res,next){
	var username = req.query? req.query.name:"";

	
	if(list.indexOf(username)>-1){
		res.json({repeat:true});
	}else{
		res.json({repeat:false});
	}
});

router.post('/login',function(req,res,next){
	var username = req.body.username;
	var password1 = req.body.password1;
	var password2 = req.body.password2;

	if(list.indexOf(username)>-1){
		$('.top').attr('display','block');
	}
})


function validate(username,password){
	if(username === 'b' && password ==='9'){
		return true;
	}else{
		return false;
	}
}

module.exports = router;