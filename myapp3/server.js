var app = require('./app.js');


var server = app.listen('3000','192.168.0.99',function(e){
	var host = server.address().address;
	var port = server.address().port;
	console.log('example app listening at http://%s:%s',host,port);
});