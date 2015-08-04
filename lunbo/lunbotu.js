function Lunbo(id,autostatus){
	this.ref=$('#id');
	this.init();
	this.autoplay(autostatus);
	this.autostatus= autostatus;

}

Lunbo.prototype.init = function(){
	var _lunbo=this;
//选中indicator之后indicator的变化
	$(".toggles div").on('click',function(e){
		$('.toggles div').removeClass('current');
		$(e.target).addClass("current");
	});
//选中indicator之后ul的变化
	$(".toggles div").on('click',function(e){
		var status=_lunbo.autostatus;
		var clickval=Number($(e.target).attr('data-index'));
		var firstval=Number($('li:first-child').attr('data-index'));
		if(clickval>firstval){
			_lunbo.Moveleft(clickval,firstval);
			
			
			
		}
		if(firstval>clickval){
			_lunbo.Moveright(clickval,firstval);
			
			
		}
	});
// 函数去抖
var debounce = function(idle, action){
  var last;
  return function(){
    var ctx = this, args = arguments;
    clearTimeout(last);
    last = setTimeout(function(){
        action.apply(ctx, args);
    }, idle);
  };
};

var pre_cb=function(){
		var firstval=Number($('li:first-child').attr('data-index'));
			_lunbo.Moveright(firstval-1,firstval);
}

var next_cb = function(){
		var firstval=Number($('li:first-child').attr('data-index'));
			_lunbo.Moveleft(firstval+1,firstval);
		}


//点击<看前一张轮播图
$('#pre').on('click',debounce(600,pre_cb));


//点击>看后一张轮播图
$('#next').on('click',debounce(600,next_cb));
	
}

var distance= $('li').width();

Lunbo.prototype.Moveleft= function(clickval,firstval){
	$('ul').animate({left:-(clickval-firstval)*distance+"px"},1000,animateAfter1);
	function animateAfter1(){
		for(i=1;i<=clickval-firstval;i++){
			$('ul').append($('li:first-child'));
		}
		$('ul')[0].style.left=0;
		
		if(clickval<=4){
			$('.toggles div').removeClass(' current');
			$('.switchable-indicator:nth-child('+ (clickval + 1 )+')').addClass(' current');
		}else if(clickval===5){
			$('.toggles div').removeClass(' current');	
			$('.switchable-indicator[data-index=0]').addClass(' current');
		} 	
	};
}

Lunbo.prototype.Moveright= function(clickval,firstval){
	$('ul').animate({left:-(firstval-clickval)*distance+"px"},1,function(){
		for(i=1;i<=firstval-clickval;i++){
			$('ul').prepend($('li:last-child'));
		}
	});

	$('ul').animate({left:"0px"},1000);
	$('.toggles div').removeClass('current');
	if(clickval === -1){
		$('.toggles div').removeClass(' current');	
		$('.switchable-indicator[data-index=4]').addClass(' current');
	}else if(clickval>=0){
		$('.switchable-indicator:nth-child('+ (clickval + 1 )+')').addClass(' current');
	}
		
	
}



Lunbo.prototype.autoplay=function(autostatus){
	//自动轮播
	
	function fn(){
			var firstval=Number($('li:first-child').attr('data-index'));
			lunbo.Moveleft(firstval+1,firstval);

	}
	if(autostatus===true) var timer = setInterval(fn,3000);
	if(autostatus===false) clearInterval(timer);

	//鼠标移到图片时轮播自动停止（实际上我针对div.wrap设置的）
	$('div').on("mouseover",function(e){
		clearInterval(timer);
	})
	//鼠标移开轮播继续
	$('ul').on("mouseout",function(e){
		timer = setInterval(fn,3000);
	})
	
}








	