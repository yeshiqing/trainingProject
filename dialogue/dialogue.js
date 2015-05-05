function Dialog(id, title, content){
	this.id = id;
	this.title= title;
	this.content = content;
	this.ref = null;
	this.init();
}

Dialog.prototype.init =function(){
	//创建dialogue的DOM结构
	var wrap = $('<div class="dialog"></div>');
	var headerWrap = $('<div class="header">' + this.title + '<div class="close">X</div></div>');
	var contentWrap = $('<div class="content">' + this.content + '</div>');
	wrap.append(headerWrap);
	wrap.append(contentWrap);

	this.ref = wrap;


	//将dialogue插入到html中
	$('body').append(wrap);

	
	var inv = new Invisible();
	//绑定遮罩事件
	$('#test').on('click',function(e){
		inv.show();

	});
	var _dialogue = this;

	//绑定关闭X号事件
	$('.dialog .close').on('click',function(e){
		_dialogue.hide();
		inv.hide();

	});

	$(document).on('click',function(e){
		var target = e.target;

		if($(target).parents('.dialog').length > 0) return false;

		_dialogue.hide();
		inv.hide();
	});
	
	

}

Dialog.prototype.show = function(){
	this.ref.css('display','block');
	this.ref.animate({
		opacity: 1,
		width: 600,
		height:281
	},130,"linear");

}

Dialog.prototype.hide = function(){
	var _dialog= this.ref;
	this.ref.animate({
		opacity:0,
		height:0,
		width:0}
	,90,"swing",function(){_dialog.css('display','none');});
	

}



function Invisible(){
	this.ref = null;
	this.init();
}

Invisible.prototype.init= function(){
	//创建invisible的DOM结构
	var invis =$('<div class="invisible"></div>');

	//将invisible更改z-index值并插入到html中并
	$('body').append(invis);

	this.ref =invis;
}

Invisible.prototype.show = function(){
	this.ref.css('visibility','visible');
}

Invisible.prototype.hide = function(){
	this.ref.css('visibility','hidden');
}