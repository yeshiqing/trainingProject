var express= require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('undone',{title:'尚未做完'});
});

module.exports= router;