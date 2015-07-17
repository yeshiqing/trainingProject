var preloader = setTimeout(
	function(){
		$('#load').css('display','none');
		$('#preloader').addClass('preloadfade');
		setTimeout(function(){
			$('#preloader').css('display','none');
			$('h1').removeClass('typing-origin');
			$('h1').addClass('typing');
			setTimeout(function(){$('h1').css('border','none')},4000)
		},1800);
	},2900);

// 监视滚动条以执行navbar的动作
$(document).on('scroll', function(e) {
	var nav_top = $('.navbar').position().top,
		scroll_top = $(document).scrollTop(),
		carousel_bottom = $('#carousel-example-generic').position().bottom;

	if (carousel_bottom < 0) {
		$('.nav-wrap').addClass('ceiling');
		$('.navbar').addClass('navbar-color');
	} else if (carousel_bottom >= 0) {
		$('.nav-wrap').removeClass('ceiling');
		$('.navbar').removeClass('navbar-color');
	}
});

// 监视滚动条以执行各个分title的动作
$(document).on('scroll', function(e) {
	var scroll_top = $(document).scrollTop(),
		title_top = $('#skill-head').position().top,
		window_height = $(window).height(),
		diff = title_top - scroll_top;
	if (diff > 0 && diff < window_height) {
		$('#skill-head').addClass('skill-head');
	}
});



//myskill部分的js
$('.skill-border').on('mouseover', function(e) {
	if ($(window).width() < 768) {
		$(this).parent('.skill').find('.skill-text').css('display', 'block');
		return false;
	}
	
	$('.skill').removeClass('skill_wrap-active');
	$(this).parent('.skill').addClass('skill_wrap-active');
	
});


// myskill部分手机端操作

$('.skill-border').on('click', function(e) {
	if ($(window).width() < 768) {
		$('.skill-text').hide();
		$(this).parent('.skill').find('.skill-text').css('display', 'block');
		return false;
	}
});

// 传送带blog对象的jquery组件
(function($) {
	$.fn.blogmove = function(option) {
		var defaultconf = {

			callback: null
		};
		var conf = $.extend({}, defaultconf, option);
		var blogMove = this;

		function blog_move() {

			blogMove.eq(0).animate({
				marginLeft: '+=10px',
			}, 1000, 'linear');

		}

		$('.blog-wrap').addClass('blogmovefirst');
		var moveInterval = setInterval(watchmove, 1);

		// 监测当博客移动出去的时候
		function watchmove() {
			var blogLeft = $('.blog').first().offset().left;
			var containerRight = $('.blogs-container').position().left + $('.blogs-container').eq(0).width();

			if (blogLeft > containerRight) {
				$('.blog-wrap').removeClass('blogmovefirst');
				$('.blog-wrap').addClass('blogmovefirst');
			}
		}
		$('.blog').on('mouseover', function() {
			$('.blog-wrap').addClass('animation-stop');
			$('.gearInner').addClass('animation-stop');
			$('.gearOuter').addClass('animation-stop');
			$('.progress').removeClass('active');

		});
		$('.blog').on('mouseout', function() {
			$('.blog-wrap').removeClass('animation-stop');
			$('.progress').addClass('active');
			$('.gearInner').removeClass('animation-stop');
			$('.gearOuter').removeClass('animation-stop')
		});
		return this;
	}
})(jQuery);


$('.blog').blogmove();

// login的js
$('.login a').on('click',function(e){
	$('.login-position-fixed').css('display','block');
	$('.shade').css('display','block');
	e.stopPropagation();
});
$('.login-position-fixed').on('click',function(e){
	e.stopPropagation();
});
$(document).on('click',function(){
	$('.login-position-fixed').css('display','none');
	$('.shade').css('display','none');
});
$('.shade').on('click',function(e){
	$('.shade').css('display','none');
})