var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('successlogin',{title:'loginsuccess'});
});

module.exports = router;