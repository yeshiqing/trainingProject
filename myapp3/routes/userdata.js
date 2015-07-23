var mongoose = require("mongoose");

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/test');

// 数据库连接后，可以对open和error事件指定监听函数。
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log('连接成功')
		//在这里创建你的模式和模型
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
	id		 : String,
	name     : String,
	password : String
})

var User = mongoose.model('User', userSchema);

userSchema.statics.add = function (user, cb) {
	var _user = new User(user);
	_user.save(cb);
};

userSchema.statics.delete = function (name, cb) {
	this.remove({name: name}, cb);
};

userSchema.statics.get = function (opt, cb) {
	this.find(opt, 'name password', cb);
};

userSchema.statics.getOne = function (opt, cb) {
	this.findOne(opt, 'name password', cb);
};

userSchema.statics.update = function (opt, obj, cb) {
	this.findOneAndUpdate(opt, obj, cb);
};

userSchema.statics.updateAll = function (opt, obj, cb) {
	this.update(opt, obj, cb);
};

//倒出模型
module.exports = User