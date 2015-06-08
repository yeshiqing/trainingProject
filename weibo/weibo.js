
	// 滚动滑轮出现回到顶部的箭头
	$(window).scroll(function(e){
		if($(window).scrollTop()==0){
			$('.return-top').css('display','none');
		}else{
			$('.return-top').css('display','block');
		}
		
	})

	//固定两边的热点话题和朋友圈分组
	window.onscroll=function(){
		if($(window).scrollTop()>2000){
			$('.hot-topic-wrap').attr('style','display:block;position:fixed;top:60px');
			$('.recom-member').attr('style','visibility:hidden');
		};
		if($(window).scrollTop()<1970){
			$('.hot-topic-wrap').attr('style','display:none;');
			$('.recom-member').attr('style','visibility:visible')
		};
		if($(window).scrollTop()>=1970&&$(window).scrollTop()<=2000){
			$('.hot-topic-wrap').attr('style','display:block;position:fixed;top:0px');
			$('.hot-topic-wrap').animate({top:"60px"},400);
			$('.recom-member').attr('style','visibility:hidden');
		};

		var rightup=$(document).height()-$(window).height()-100;
		if($(window).scrollTop()>=rightup){
				b=$(window).scrollTop()-rightup;
				$('.hot-topic-wrap').attr('style','display:block;position:fixed;top:60px;margin-top:-'+b+'px');
		}

		var	leftup=$(document).height()-$(window).height()-200;
		if($(window).scrollTop()>=leftup){
				b=$(window).scrollTop()-leftup;
				$('.main-left').attr('style','display:block;position:fixed;top:60px;margin-top:-'+b+'px');
		}
		if($(window).scrollTop()<($(document).height()-$(window).height()-200)){
				b=$(window).scrollTop()-leftup;
				$('.main-left').attr('style','display:block;position:fixed;top:60px;margin-top: 0px');
		}
	}
		
	
	$('.search-input').focus(function(e){
		$('.search-plus').attr('style','display:block');
		$('.search-input').addClass('search-input-clicked');
	});

	$('.search-input').blur(function(e){
		$('.search-plus').attr('style','display:none');
		$('.search-input').removeClass('search-input-clicked');
	})
	$('.WB_notes').on('click',function(e){
		$('.WB_notes').attr('style','display:none');
	})
	$('.W_input').focus(function(e){
		$('.key .input').addClass('search-input-clicked');
		if($('.W_input').val().length>140){
			$('.surplus').attr('style','display:inline');
			$('.news').attr('style','display:none');
			$('.wordleft140').attr('style','display:none');
		}else if($('.W_input').val().length<=140){
			$('.surplus').attr('style','display:none');
			$('.news').attr('style','display:none');
			$('.wordleft140').attr('style','display:block');
			var a= $('.W_input').val().length;
			b=140-a;
			$('.wordleft140 .num').html(b);
		}
		
	})
	$('.W_input').keyup(function(e){
		var str=$('.W_input').val().trim();
		var wordnum=0;
		for(i=1;i<=str.length;i++){
			if(str.charCodeAt(i-1)>=10000){
				wordnum=wordnum+1;
			}else{
				wordnum=Math.ceil((i)/2);
			}


		}
		if(wordnum<=140){
			$('.surplus').attr('style','display:none');
			$('.news').attr('style','display:none');
			$('.wordleft140').attr('style','display:block');
			b=140-wordnum;
			$('.wordleft140 .num').html(b);
		}else if($('.W_input').val().length>=140){
			$('.surplus').attr('style','display:block');
			$('.news').attr('style','display:none');
			$('.wordleft140').attr('style','display:none');
			var a= $('.W_input').val().length;
			b=wordnum-140;
			$('.surplus .num').html(b);
		}
	})
	$('.W_input').blur(function(e){
		if($('.W_input').val().trim()===""){
			$('.news').attr('style','display:block');
			$('.wordleft140').attr('style','display:blur');
		}
		
	})
	$('.nav-position-right .info').on('mouseover',function(e){
		$('.nav-position-right-info').css('display','block')
	})
	$('.nav-position-right .info').on('mouseout',function(e){
		$('.nav-position-right-info').css('display','none')
	})
	$('.nav-position-right .set').on('mouseover',function(e){
		$('.nav-position-right-set').css('display','block')
	})
	$('.nav-position-right .set').on('mouseout',function(e){
		$('.nav-position-right-set').css('display','none')
	})
	
	$('.ui-scroll').on('mouseover',function(e){
		$('.ui-scroll').css('overflow','auto');
		$('.ui-scroll').addClass('scrollchange');
	})
	$('.ui-scroll').on('mouseout',function(e){
		$('.ui-scroll').css('overflow','hidden');
		
		
	})

	$('.unfold-fold-button .fold').on('click',function(e){
		$('.unfold-fold-button .unfold').attr('style','display:inline');
		$('.unfold-fold-button .fold').attr('style','display:none');
		$('.morelist').css('display','none');
		$('.ui-scroll').removeClass('heightchange');
	})
	$('.unfold-fold-button .unfold').on('click',function(e){
		$('.unfold-fold-button .fold').attr('style','display:inline');
		$('.unfold-fold-button .unfold').attr('style','display:none');
		$('.morelist').css('display','block');
		$('.ui-scroll').addClass('heightchange');
	})

//绑定点击表情事件,,这个地方有点小问题其实
$('.kind a:nth-child(1)').on('click',function(e){
	$('.content').css('display','inline-block')
})

	$(window).click(function(e){
		if(e.target!==$('.kind a:nth-child(1)')[0]&&e.target!==$('.content')[0]){
				$('.content').css('display','none')
		}
	})



	
	

// 给页面添加新的微博
	function publishNew(){
		var domShell=$('<div class="WB-cardwrap" data-order="1"><div class="face-new"><img class="touxiang" src="images/touxiang.jpg"></div></div>');
		var domcontent=$('<div class="WB-cardwrap-content"><div class="WB-info-new">PAGEYE</div><div class="arrow-down"></div></div>');
		var domfunc=$('<div class="WB-function"><ul><li><span>收藏</span></li><li><span>转发</span></li> <li><span>评论</span></li><li><span>点赞</span></li></ul></div>');
		var text=$('.W_input ').val().trim();
		var domtext=$('<div class="WB-text-new">'+text+'</div>');
		var domfrom=$('<div class="WB-from"><a href="javascript:void(0)">刚刚</a>来自<a href="javascript:void(0)">新浪微博</a></div>');
		// var arrow_down=$('<div class="arrow-down"></div>');
		var weibo_func=$('<div class="weibo-func"><ul><li><a href="javascript:void(0)">删除</a></li></ul><ul class="weibo-func-hide"><li><a href="javascript:void(0)">屏蔽关键词</a></li></ul><div class="see_more"><span class="see_more-icon"></span></div></div>') 

		$('.feed-list').prepend(domShell);
		domShell.after(domfunc);
		$('.WB-cardwrap .face-new:eq(0)').after(domcontent);
		$('.WB-info-new:eq(0)').after(domtext);
		domtext.after(domfrom);	
		$('.arrow-down').eq(0).after(weibo_func);

		$('.see_more').on('click',function(e){
			$('.see_more').css('display','none');
			$('.weibo-func-hide').css('display','block');	
		});

		weibo_func.on('click','ul:nth-of-type(1)',function(e){
			domShell.css('display','none');
			domfunc.css('display','none');
		});
	}

	$('.publish').on('mouseover',function(e){
		if($('.W_input').val().trim()!==""){
			$('.publish').addClass('W_btn_a');
		}
	})
	$('.publish').on('click',function(e){
		var wb_text=$('.W_input').val().trim();
		if(wb_text!==""){
			publishNew();
			$('.W_input').val("");
		}
	})


	//微博内容上的功能键1：右上角的下拉菜单	
	
	$('.see_more').on('click',function(e){
		$('.see_more').css('display','none');
		$('.weibo-func-hide').css('display','block');	
	})

	$(document).on('click',function(e){
		var a=$('.weibo-func').length;
		for(i=0;i<a;i++){
			if($(e.target)[0]==$('.arrow-down')[i]){
				var weibo_func_display=$('.weibo-func').eq(i).css('display');
				if(weibo_func_display=='block'){
					$('.weibo-func').eq(i).slideUp(300);
				}else if(weibo_func_display=='none'){
					$('.weibo-func').eq(i).slideDown(300);
				}
			}else if($(e.target).parents('.weibo-func').length>0){
					return false;
			}else{
				$('.weibo-func').eq(i).slideUp(300);
			}	
		}
		$('.weibo-func-hide').css('display','none');
		$('.see_more').css('display','block');
	})
					
	//内容导航条事件(利用闭包)
	var a=$('.nav').length;
		for(i=0;i<a;i++){
			(function(num){
				$('.nav').eq(num).on('click',function(e){
					$('.bg-triangle').css('background','white');
					$('.bg-triangle').eq(num).css('background','transparent');	
				})
			})(i);
		}
	

	//有一条新微博
	function newWeibo(){
		var domShell=$('<div class="WB-cardwrap" data-order="1"><div class="face-new"><img class="touxiang" src="images/data-2.jpg"></div></div>');
		var domcontent=$('<div class="WB-cardwrap-content"><div class="WB-info-new">央视新闻</div><div class="arrow-down"></div></div>');
		var domfunc=$('<div class="WB-function"><ul><li><span>收藏</span></li><li><span>转发</span></li> <li><span>评论</span></li><li><span>点赞</span></li></ul></div>');
		var domtext=$('<div class="WB-text-new">#警惕中东呼吸综合征#【78名韩国MERS患者密切接触者全部找到】截至目前，广东省追踪中东呼吸综合征密切接触者共78人已全部找到，其中6名中东呼吸综合征密切接触人员是近两天找到的，目前6人情况良好，正进一步观察中。（央视记者吴思雅）</div>');
		var domfrom=$('<div class="WB-from"><a href="javascript:void(0)">刚刚</a>来自<a href="javascript:void(0)">新浪微博</a></div>');
		var weibo_func=$('<div class="weibo-func"><ul><li><a href="javascript:void(0)">删除</a></li></ul><ul class="weibo-func-hide"><li><a href="javascript:void(0)">屏蔽关键词</a></li></ul><div class="see_more"><span class="see_more-icon"></span></div></div>') 

		$('.feed-list').prepend(domShell);
		domShell.after(domfunc);
		$('.WB-cardwrap .face-new:eq(0)').after(domcontent);
		$('.WB-info-new:eq(0)').after(domtext);
		domtext.after(domfrom);	
		$('.arrow-down').eq(0).after(weibo_func);

		$('.see_more').on('click',function(e){
			$('.see_more').css('display','none');
			$('.weibo-func-hide').css('display','block');	
		});

		weibo_func.on('click','ul:nth-of-type(1)',function(e){
			domShell.css('display','none');
			domfunc.css('display','none');
		});

	}


	$('.WB_notes').on('click',function(e){
		$('.WB_notes').css('display','none');
		newWeibo();
	})

	//会员专区 明星势力榜
	$('.recom-member-title span:nth-of-type(1)').on('click',function(e){
		$('.recom-member-VIP').css('display','block');
		$('.recom-member-star-wrap').css('display','none');
	});

	$('.recom-member-title span:nth-of-type(2)').on('click',function(e){
		$('.recom-member-VIP').css('display','none');
		$('.recom-member-star-wrap').css('display','block');
	});

	//控制音乐插件
	$('.music-fold').on('click',function(e){
		$('.music-plugin').css('left','-694px');
		setTimeout(function(){
			$('.music-unfold').css('display','inline-block');
		},400);
		
	})
	$('.music-unfold').on('click',function(e){
		$('.music-plugin').css('left','0px');
		$('.music-unfold').css('display','none');
	})
	$('.basic-func-play').on('click',function(e){
		$('.basic-func-stop').css('display','inline-block');
		$('.basic-func-play').css('display','none');
	})
	$('.basic-func-stop').on('click',function(e){
		$('.basic-func-play').css('display','inline-block');
		$('.basic-func-stop').css('display','none');
	})

	// 够细腻，终于完成了音量槽的设置
	$('.volume-btn').mousedown(function(e){
		var flag=false;
		var start=setTimeout(function(){
					flag=true;
					$(window).mousemove(function(f){
						var mouseX= f.pageX;
						var volumelevel_LX=$('.volume-adjust').offset().left;
						var allwidth=$('.volume-adjust').width();	
						var volumelevel_RX=volumelevel_LX+allwidth;
						var Rdis=volumelevel_RX-mouseX;
						var Ldis=mouseX-volumelevel_LX;

						if(mouseX>=volumelevel_RX){
							$('.volume-btn').css('right',"-7.5px");
							$('.volume-level').css('width','100%');
						}else if(mouseX<=volumelevel_LX){
							$('.volume-btn').css('right',"66.5px");
							$('.volume-level').css('width','0%');
						}else if(volumelevel_LX<mouseX<volumelevel_RX){
							$('.volume-btn').css('right',(Rdis-7.5)+'px');
							$('.volume-level').css('width',((Ldis/allwidth)*100)+'%');
						}
						$(window).on('mouseup',function(){
							$(window).unbind('mousemove');
						})
					})

				},150);
		$('.volume-btn').mouseup(function(){
			if(!flag){
				clearTimeout(start);
			}
		})
		
	})
