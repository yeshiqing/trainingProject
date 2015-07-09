var express = require('express');
// 创建一个新的router，router是一个新建的独立routes控件，控件中的变量只在控件中有效，不会在外部出现命名冲突。
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('login',{title:'login'});
});

router.get('/',function(req,res,next){
	res.render('login-self',{title:'login'});
});

router.post('/',function(req,res,next){

	var username =req.body.username;
	var password = req.body.password;

	

	var result = validate(username,password);

	if(result){
		res.send(req.body.ck);
	}else{
		res.send('errorXXXX');
	}

});

router.get('/repeat',function(req,res,next){
	var un= req.query? req.query.un:"";

	var list = ['byron','casper','vincent'];
	if(list.indexOf(un)>-1){
		res.json({repeat:true});
	}else{
		res.json({repeat:false});
	}

})

function validate(username,password){
	if(username === 'b' && password ==='9'){
		return true;
	}else{
		return false;
	}
}

// 把这个模块导出外面调require('')的时候拿到module.exports对象
module.exports = router;

