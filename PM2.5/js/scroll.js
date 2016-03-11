(function() {
	var systemIndex = {
			/**
			 * 是否允许js动画进行,防止多次触发setInterval;
			 */
			intervalAllow: true,
			init: function() {
				this.css.init();
				this.circleClick.init();
				this.scroll.init();

				var browser = myBrowser();
				if (browser != "IE") {} else {
					//
				}
			},
			css: {
				init: function() {
					var browser = myBrowser();
					switch (browser) {
						case "FF":
							break;
						case "IE":
							var uA = navigator.userAgent;
							//判断IE版本
							var orderItems = document.getElementById("js_orderItem").children;
							for (var i = 0, l = orderItems.length; i < l; i++) {
								orderItems[i].className += " orderItemIE";
							}
							document.getElementById("fullContainer").style.overflow = "hidden";
							this.circle();
							break;
						case "Opera":
							break;
						case "Chrome":
						case "Safari":
							break;
					}
				},
				circle: function() {
					var ul = document.getElementById("js_effectBtnWrapUL");
					for (var i = 0, l = ul.children.length; i < l; i++) {
						addClass(ul.children[i].children[1], "circleImg");
					}
				}
			},
			circleClick: {
				init: function() {
					this.renderClickCircle();
				},
				renderClickCircle: function() {
					var _this = this;
					var _i; // 点击的是第几屏
					var ul = document.getElementById("js_effectBtnWrapUL");
					if (document.addEventListener) {
						ul.addEventListener("click", function(e) {
							_circleClick(e);
						}, false);
					} else if (document.attachEvent) {
						ul.attachEvent("onclick", function(e) {
							_circleClick(e);
						}, false);
					}

					function _circleClick(e) {
						t = e.target || e.srcElement;
						if (t.tagName.toLowerCase() === "span") {
							for (var i = 0, p = ul, l = p.children.length; i < l; i++) {
								var child = p.children[i];
								if (child === t.parentNode) {
									_i = i;
								}
							}
							_this.clearCircle();
							_this.showCircle(_i)
							_this.showPage(_i);
						}
					}
				},
				clearCircle: function() {
					var _n = 0;
					var ul = document.getElementById("js_effectBtnWrapUL");
					for (var i = 0, l = ul.children.length; i < l; i++) {
						var li = ul.children[i];
						var circle = li.children[1];
						if (circle.className.indexOf("show") > -1) {
							_n = i;
						}
						removeClass(circle, "show");
					}
					return _n;
				},
				showCircle: function(target) {
					var ul = document.getElementById("js_effectBtnWrapUL");
					var li = ul.children[target];
					var circle = li.children[1];
					addClass(circle, "show");
				},
				showPage: function(target) {
					var browser = myBrowser();
					if (browser != "IE") {
						var mainItem = document.getElementById("mainWrap0")
						var h = mainItem.clientHeight;
						document.getElementById("mainContainer").style.top = "" + (-target * 100) + "%";
					} else {
						var _i = systemIndex.indexScreen();
						var d = target - _i;
						systemIndex.iframeMove(d, null, _i);
					}
				}
			},
			//scroll事件、键盘上下键触发
			// _i表示当前第几屏；d:确定正负以及滑屏个数{大于零：往下滑,小于零：往上滑}
			iframeMove: function(d, func, _i) {
				if (func) {
					if (document.detachEvent) {
						document.body.detachEvent("onmousewheel", func, false);
					} else if (document.removeEventListener) {
						document.body.removeEventListener("DOMMouseScroll", func, false);
						document.body.removeEventListener("mousewheel", func, false);
					}
				}
				var mainContainer=document.getElementById("mainContainer");
				var topOrigin;
				if(myBrowser()==="IE"){
					topOrigin = parseInt(mainContainer.style.top);
					var step = ((-_i - d) * 100 - topOrigin) / 10;
					var i = 0;
					var interval = setInterval(function() {
						i++;
						document.getElementById("mainContainer").style.top = topOrigin + "%";
						topOrigin = topOrigin + step;
						if (i === 11) {
							systemIndex.intervalAllow = true;
							clearInterval(interval);
						}
					},30)
				}else{
					addClass(mainContainer,"addTransition");
					topOrigin = parseInt(mainContainer.style.top);
					mainContainer.style.top=(-_i - d) * 100+"%";
				}
				if (func) {
					setTimeout(function() {
						if (document.attachEvent) {
							document.body.attachEvent("onmousewheel", func, false);
						} else if (document.addEventListener) {
							document.body.addEventListener("mousewheel", func, false);
							document.body.addEventListener("DOMMouseScroll", func, false);
						}
					}, 800)
				}
			},
			//判断当前屏幕
			indexScreen: function() {
				var index = null;
				var browser = myBrowser();
				var str = document.getElementById("mainContainer").style.top;
				var y_origin = str.replace(/(\d*)%?(px)?/g, "$1");
				index = Math.round((-y_origin) / 100);
				return index;
			},
			//滚轮事件和键盘上下键
			scroll: {
				init: function() {
					var _flag = false;
					browser = myBrowser();
					var _this = this;
					//touch.js
					touch.on('document.body', 'swipetop', function(ev){
						var i = systemIndex.indexScreen();
						systemIndex.iframeMove(1, null, i);
					    alert(ev.type);
					});
					touch.on('document.body', 'swipebottom', function(ev){
						var i = systemIndex.indexScreen();
						systemIndex.iframeMove(-1, null, i);
					    alert(ev.type);
					});
					switch (browser) {
						case "FF":
							document.body.addEventListener("DOMMouseScroll", function go(e) {
								_this.go(e, arguments.callee);
							}, false)
							document.body.addEventListener("keypress", function go(e) {
								_this.go(e, arguments.callee);
							}, false);
							break;
						case "Chrome":
						case "Safari":
							document.body.addEventListener("mousewheel", function go(e) {
								_this.go(e, arguments.callee);
							}, false)
							document.body.addEventListener("keydown", function go(e) {
								_this.go(e, arguments.callee);
							}, false);
							break;
						case "IE":
						case "Opera":
							if (document.attachEvent) {
								document.body.attachEvent("onmousewheel", function go(e) {
									_this.go(e, arguments.callee);
								}, false)
								document.body.attachEvent("onkeydown", function go(e) {
									_this.go(e, arguments.callee);
								}, false);
							} else if (document.addEventListener) {
								document.body.addEventListener("mousewheel", function go(e) {
									_this.go(e, arguments.callee);
								}, false)
								document.body.addEventListener("keydown", function go(e) {
									_this.go(e, arguments.callee);
								}, false);
							}
							break;
					}

				},
				go: function(e, func) {
					if (!e) {
						return;
					}
					var orientation;
					if (typeof e.keyCode === "undefined") {
						orientation = e.detail || -(e.wheelDelta);
					} else {
						switch (e.keyCode) {
							case 38: //向上
								orientation = -1;
								break;
							case 40: //向下
								orientation = 1;
								break;
							case 0:
								if (myBrowser() === "IE") {
									orientation = e.detail || -(e.wheelDelta);
								}
								if(myBrowser()==="Safari"){
									//safari的鼠标滚轮事件存在的keyCode;
									orientation=-e.wheelDelta;
								}
								break;
							default:
								return;
						}
					}
					var _this = systemIndex.scroll;
					var i = systemIndex.indexScreen();
					var flag = true;
					var cName1 = document.getElementById("circle10").className;
					var cName2 = document.getElementById("circle0").className;
					if (orientation > 0) {
						// 往下滑;
						d = 1;
						if (cName1.indexOf("show") > -1) {
							return;
						}
					} else if (orientation <= 0) {
						// 往上滑
						d = -1;
						if (cName2.indexOf("show") > -1) {
							return;
						}
					}
					if (flag) {

						if (myBrowser() != "IE") {
							systemIndex.iframeMove(d, func, i);
						} else {
							if (systemIndex.intervalAllow === false) {
								return;
							}
							systemIndex.intervalAllow = false;
							systemIndex.iframeMove(d, func, i);
						}
						_this.circle_move(d);
					}
				},
				circle_move: function(d) {
					var _i, _n;
					for (var i = 0, p = document.getElementById("js_effectBtnWrap"), l = p.children.length; i < l; i++) {
						var li = p.children[i];
						if (li.children[1].className.indexOf("show") > -1) {
							_i = i;
						}
					}
					var _n = systemIndex.circleClick.clearCircle();
					var circle = document.getElementById("js_effectBtnWrapUL").children[(_n + d)].children[1];
					addClass(circle, "show");

				}
			}
		}
		// 抽象出的扩展方法

	function addClass(item, cName) {
		if (item.className.indexOf(cName) > -1) {
			return;
		}
		item.className += " " + cName;
	}

	function removeClass(item, cName) {
		if (item.className.indexOf(cName) === -1) {
			return;
		}
		item.className = item.className.replace(cName, '');
	}

	systemIndex.init();
}())