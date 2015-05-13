function Carousel(id,num){
	this.ref=$('#id');
	this.num=num;
	this.id=id;
	this.init();
	this.control();
	this.speed();
}

Carousel.prototype.init=function(){
	var _carousel = this;
	//从表单里取出数据
	$('input').on('keydown',function(e){
		var num= $('input')[0].value.trim();
		if(e.keyCode !== 13) return;
		if(e.keyCode ==13){
			if(num===""||isNaN(num)){
				alert("请输入数字");
				return;
			} ;
			if(num<3) {
				alert("请输入大于等于3的数字");
				return;
			}
			if (!(/(^[1-9]\d*$)/.test(num))){
				alert('请输入整数')
				return;
			}

		$('input').val('');
	//清空已有figure元素
		$('figure').remove();
		_carousel.number(num);			
		}
	})

}


Carousel.prototype.number=function(count){
 var animation1=new Animation(count,this);

}


Carousel.prototype.control = function(){
	$('.containerSection').on('click',function(e){
		if($('.circle').css('left')=="-120px"){
			$('.circle').animate({left:"3px"},1300,"swing");
			$('.bar1').removeClass('bar1rotate');
			$('.bar1').addClass(" bar_1rotate");
			$('.bar2').removeClass('bar2rotate');
			$('.bar2').addClass(" bar_2rotate");
			setTimeout(function(){
				$('.off').removeClass('red');
				$('.on').addClass(' green');
			},800);
			setTimeout(function(){
				$('#carousel').css('-webkit-animation-play-state','running');			
			},1000);
		}else if($('.circle').css('left')=="3px"){
			$('.circle').animate({left:"-120px"},1300,"swing");
			$('.bar1').removeClass('bar_1rotate');
			$('.bar1').addClass(" bar1rotate");
			$('.bar2').removeClass('bar_2rotate');
			$('.bar2').addClass(" bar2rotate");
			setTimeout(function(){
				$('.on').removeClass('green');
				$('.off').addClass(' red');
			},800);
			setTimeout(function(){
				$('#carousel').css('-webkit-animation-play-state','paused');			
			},1000);
		}

	
	})
}

Carousel.prototype.speed = function(){
	$("#input2").on('mouseup',function(){
		var b=$('#input2')[0].value;
		//改变css duration
		var d=Math.round(100/b)/100;
		$('#carousel').css("-webkit-animation-duration",d +"s");

		// 删去carousel1,添加carousel2
		if($('#carousel').hasClass('carousel1')){
			$('#carousel').removeClass('carousel1');
			$('#carousel').addClass(' carousel2');
		}else if($('#carousel').hasClass('carousel2')){
			$('#carousel').removeClass('carousel2');
			$('#carousel').addClass(' carousel1');
		}
		
		
	})
	
		
}


function Animation(num,app){
	//根据面板数量计算面板相关数据
	translatez=Math.tan(Math.PI/num);
	tz=Math.round(105/translatez);
	rotate=Math.round(360/num);
	

	//创建figure的DOM结构并添加到html中
	for(i=1;i<=num;i++){
		fi= $('<figure></figure>');
		$('div:first-child').append(fi);
	}
	for(g=1;g<=num;g++){
		r=rotate*g;
		$('#carousel figure:nth-child('+g+')').css("-webkit-transform","rotateY("+ r +"deg) translateZ("+tz+"px)");
	}
	
	$('.translateZ').css('-webkit-transform','translateZ(-'+tz+'px)');
	//给面板添加色彩
	var m = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
	function randArray(m, len) {
	    m.sort(function () {
	        return Math.random()-0.5;
	    });
	    return m.slice(0, len);
	}
	//乱序打乱数组
	for(h=1;h<=num;h++){
		var c1=randArray(m, 1).join("");
		var c2=randArray(m, 1).join("");
		var c3=randArray(m, 1).join("");
		var color="#"+c1+c2+c3
		$('#carousel figure:nth-child('+h+')').css('background',color)
	}
}



