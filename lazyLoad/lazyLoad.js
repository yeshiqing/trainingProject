
(function($){
	$.fn.extend({
		lazyLoad:function(option){
			var defaultconf={
				container:$(window),
				prop:'data-src',
				callback:null
			};
			var conf=$.extend({},defaultconf,option);
			conf.cache=[];

			var callback=function(ele){
				if($.isFunction(conf.callback)){
					conf.callback.call(ele);
				}
			}

			this.each(function(ele){
				var data={
					obj:$(this),
					src:$(this).attr(conf.prop)
				};
				conf.cache.push(data);
			})
			var container=conf.container;
			
			

			var loading= function(e){

					var containerHeight=container.height(),
						containerTop=0;	

						if(container[0]==window){
							var  containerTop=$(window).scrollTop();
						}else{
							var containerTop=container.offset().top;
						}

					$.each(conf.cache,function(index,data){
						

						
						var $ele=data.obj;
														
// 刚开始我写在这里，总是出现错误，然后我就放在if里面就没事了。好好研究
//因为后面执行过一遍loading所以,前两个img已经变成null了所以会出现bug.
							if($ele){
								var post=$ele.offset().top - containerTop,
								itemHeight=$ele.height(),
								postb=post+itemHeight;								
								if((0<=post && post<containerHeight )|| (0<postb&& postb<=containerHeight)){ 
									var data_src=$ele.attr('data-src');
									$ele.attr('src',data_src);									
									callback($ele);
									data.obj=null;									
								}
							}
					 });
					//解绑事件
					var a=0;
					for(i=0;i<conf.cache.length;i++){
						if(!(conf.cache[i].obj)){
							a++;
						}
					}					 
					if(a==conf.cache.length){
						container.off('scroll',loading);
					};
				}
				loading();
				//函数节流throttle
				var scrollTime=null;
				container.on('scroll',function(){
					if(scrollTime){
						clearTimeout(scrollTime);
					}
					var scrollTime=setTimeout(function(){
						loading();
					},300)					
				});
				

				//支持链式调用
				return this;
		}
	});

})(jQuery);


$('.item img').lazyLoad();


