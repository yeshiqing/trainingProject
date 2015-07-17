var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 下面这个文件是自己输入的
router.get('/json1',function(req,res,next){
	res.json({success: true});
})


module.exports = router;
