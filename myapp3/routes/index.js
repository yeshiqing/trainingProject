var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '贵在坚持' });
});

// login的页面写在这里
router.get('/',function(req,res,next){
	res.render('index',{title:'login'});
});

router.post('/',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;

	var result = validate(username,password);
	res.redirect('/successlogin');
});


function validate(username,password){

}

module.exports = router;
