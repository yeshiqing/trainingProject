var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('successregister',{title:'registersuccess'});
});

module.exports = router;