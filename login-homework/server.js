// 引用一下这个启动文件
var app = require('./app.js');

// 设置server信息，之后在nodejs中通过node server.js命令重新启动server
var server = app.listen(3000,'localhost',function(){
	//监听事件，端口号在前，ip地址在后
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s',host, port)
})
