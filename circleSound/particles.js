var Particles = function(x, y) {
	this.maxSpeed = 1;
	this.vel = createVector();
	this.acc = createVector();
	this.pos = createVector(x, y);
}
Particles.prototype.wander = function(range) {
	var force = createVector(random(range)*2-range,random(range)*2-range);
	force.setMag(random(range));//向量长度
	this.applyForce(force);

}
// target为Vector类型
Particles.prototype.attraction = function(target) {
	var force=p5.Vector.sub(target,this.pos);
	var d=force.mag();//mag()表示向量长度
	if(d<500){
		force.setMag(d*0.01);//正比例函数模型：距离越近的时候，引力越小，距离越大的时候，引力越大。
		this.applyForce(force);
	};
} 
Particles.prototype.repulsion = function(target) {
	var force=p5.Vector.sub(this.pos, target)
	var d=force.mag();
	if(d<300){
		force.setMag(amplitude.getLevel()*1600/d);//反比例函数模型：距离越近，斥力越大；距离越远，斥力越小。
		this.applyForce(force);
	}
	if(d>400&&d<600){
		force.setMag(amplitude.getLevel()*300/d);//反比例函数模型：距离越近，斥力越大；距离越远，斥力越小。
		this.applyForce(force);
	}

}
Particles.prototype.colorChange = function(target) {
	var force=p5.Vector.sub(this.pos, target)
	var d=force.mag();
	if(d>200){
		var c=color(random(255),random*(255),random(255));
		fill(c,100);
	}
}
Particles.prototype.applyForce = function(force) {
	this.acc.add(force);
}
Particles.prototype.update = function() {
	this.vel.add(this.acc);
	this.vel.limit(this.maxSpeed/2);//限制它的最大速度
	this.pos.add(this.vel);
	this.acc.mult(0);
}
Particles.prototype.display = function(target) {
	var force=p5.Vector.sub(this.pos, target)
	var d=force.mag();
	if(d<60){
		stroke(0,volume*255,map(volume*255,0,255,100,255),map(d,0,80,255,0));
	}else if(d<100&&d>50){
		stroke(255,volume*255,100,map(d,80,130,50,0));
	}else{	
		stroke(255);
	}
	var len=this.vel.mag();
	strokeWeight(map(len,0,len,1,3));
	point(this.pos.x, this.pos.y)
}
