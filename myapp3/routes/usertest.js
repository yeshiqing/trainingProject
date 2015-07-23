var express= require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('usertest',{title:'test'});
});

module.exports= router;