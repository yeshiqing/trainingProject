function Todo(id){
	this.ref = document.getElementById(id);
	this.itemsWrap =  this.ref.querySelector('.todo-items');
	this.activeNumWrap = this.ref.querySelector('.active-num');
	this.completeWrap = this.ref.querySelector('.complete-wrap');
	this.completeNumWrap = this.ref.querySelector('.complete-num');

	this.items = {};//定义this.items一个空对象，里面装的什么属性可以临时添加，比如我添加this.items.id
	this.index = 0;

	this.init();
}

Todo.prototype.init = function(){
	var _todo = this;

	//绑定添加item事件处理程序
	var input = this.ref.querySelector('input');
	document.addEventListener('keydown', function(e){
		//不是回车键，直接返回
		if(e.keyCode !== 13) return;

		// 输入框没有获得焦点或者内容为空，直接返回
		if(!input.focus || input.value.trim() === '') return;

		_todo.add(input.value);

		input.value = '';
	}, false);
	//切换所有的状态
	//人家用的是this.ref想想差距。
	
	document.getElementsByClassName('todo-toggle')[0].addEventListener('click',function(e){
		if(this.className.indexOf(' complete') === -1){
			this.className += " complete";

			for(var id in _todo.items){
					if(!_todo.items[id].isActive) continue;
					_todo.items[id].switchStatus();
				}

		}else{
			this.className = this.className.replace(' complete',"");//想想这块用jquery怎么写添减className
			
			for(var id in _todo.items){
					if(_todo.items[id].isActive) continue;
					_todo.items[id].switchStatus();
				}
		}

	}, false);

	//改变视窗
	var Switch= document.getElementsByClassName('switch');
	var Active = document.querySelector('.switch-active');
	Active.addEventListener('click',function(e){
		var Li =document.getElementsByTagName('li');
		for(var i=0;i<Li.length;i++){
			if(Li[i].className.indexOf(' done') > -1){ 
				Li[i].style.display="none";
			}else{
				Li[i].style.display="block";
			}
		};
		for(i=0;i<=2;i++){
			Switch[i].className=Switch[i].className.replace('current','');
		}
		Active.className +=  ' current';


	},false);

	var Complete = document.querySelector('.switch-complete');
	Complete.addEventListener('click',function(e){
		var Li =document.getElementsByTagName('li');
		for(var i=0;i<Li.length;i++){
			if(Li[i].className.indexOf('done') > -1){ 
				Li[i].style.display="block";
			}else{
				Li[i].style.display="none";
			}
		};
		for(i=0;i<=2;i++){
			Switch[i].className=Switch[i].className.replace('current','');
		}
		Complete.className +=  ' current';

	},false);

	var All= document.querySelector('.switch-all');
	All.addEventListener('click',function(e){
		var Li =document.getElementsByTagName('li');
		for(var i=0;i<Li.length;i++){
			Li[i].style.display="block";
		};
		for(i=0;i<=2;i++){
			Switch[i].className=Switch[i].className.replace('current','');
		}
		All.className +=  ' current';
	},false);

	//双击Li的视窗对文字进行编辑
	// var Li = document.getElementsByTagName('li');//不能用这句，因为这句是对dom进行操作。而实际上dom中的li没有
	// for(var i=0;i<Li.length;i++){
	// 	Li[i].on('dblclick',function(e){
	// 		e.target.setAttribute('contenteditable','true');
	// 	},false);
	// }
	//老师把这部分写在了TodoItem.init中
	 	
	
	//点击clear进行清除
	var Clear = document.querySelector('.todo-clear');
	Clear.addEventListener('click',function(e){
		for(var id in _todo.items){
			if(!_todo.items[id].isActive){
				_todo.remove(_todo.items[id].ref);
			}
			document.querySelector('.todo-clear').style.display="none";
		}
	},false);

};

Todo.prototype.add = function(text){
	var id = 'item' + this.index++;
	var newItem = new TodoItem(id, text, this);//实例化一个新的item
	this.items[id] = newItem;//用this.items[id]是去调取这个id属性(注意id是个字符串变量)，这个id属性是临时赋予的属性，这个属性是对应的新建出来对象，id是人为造出来的属性。
	// 注意啊，这里的id做了两个作用，一个是作为newItem的一个属性，id属性。一个是作为Todo的属性，也叫id属性，但是这个id属性的内容是newItem
	this.refresh();
};

Todo.prototype.remove = function(item_dom){
	this.itemsWrap.removeChild(item_dom);
	delete this.items[item_dom.id]; //删去id是为了refresh中计数   为什么是item_dom.id不直接是id要好好想
	this.refresh();
};



Todo.prototype.refresh = function(){
	var items = this.items;//this.items一先开始有定义，是items的集合，非常有学问的。在add部分，remove部分都有提items

	var activeNum = 0,
			completeNum = 0;

	for(var id in items){
		if(items[id].isActive){
			activeNum++;
		}else{
			completeNum++;
		}
	}//看看有多少个id ，遍历一遍，计数作用

	this.activeNumWrap.innerText = activeNum;
	this.completeNumWrap.innerText = completeNum;

	if(completeNum === 0){
		this.completeWrap.style.display = 'none';
	}else{
		this.completeWrap.style.display = 'inline';
	}
}

function TodoItem(id, text, app){
	this.ref = null;
	this.app = app;

	this.id = id;
	this.text = text;
	this.isActive = true;

	this.init();
}

TodoItem.prototype.init = function(){
	//新建todo item DOM节点
	var ele = document.createElement('li');
	ele.className = 'todo-item';
	ele.id = this.id;
	ele.innerHTML += '<div class="status"></div>';
	ele.innerHTML += '<span class="item-text">' + this.text + '</span>';
	ele.innerHTML += '<div class="delete"></div>';
	this.ref = ele;

	//把新建item节点插入Todo DOM结构中
	var wrap = this.app.itemsWrap;
	wrap.insertBefore(ele, wrap.firstChild);

	var _todo = this.app;

	//绑定修改状态事件处理程序
	ele.querySelector('.status').addEventListener('click', function(e){
		var item = _todo.items[ele.id];
		item.switchStatus();
		document.querySelector('.todo-clear').style.display="inline-block";
	}, false);

	//绑定“删除项目”事件处理程序
	ele.querySelector('.delete').addEventListener('click', function(e){
		_todo.remove(ele);
	}, false);

	//绑定双击修改事件
	ele.querySelector('.item-text').addEventListener('click',function(e){
	 	e.target.setAttribute('contenteditable','true');
	 },false);
	ele.querySelector('.item-text').addEventListener('blur',function(e){
		e.target.setAttribute('contenteditable','false');
	},false)


}

TodoItem.prototype.switchStatus = function(){
	this.isActive = !this.isActive;
	if(this.isActive){
		this.ref.className = this.ref.className.replace(' done', '');
	}else{
		this.ref.className += ' done';
	}
	this.app.refresh();
};

TodoItem.prototype.hide = function(){
	if(this.ref.style.display !== 'none'){
		this.ref.style.display = 'none';
	}
};

TodoItem.prototype.show = function(){
	if(this.ref.style.display !== 'block'){
		this.ref.style.display = 'block';
	}
};
