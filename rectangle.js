// ========== RECTANGLE ==========
function rectangle(x, y, w, h) 
{ this.x = x; this.y = y; this. w = w, this.h = h; }
rectangle.prototype = new point(0,0);
rectangle.prototype.W = function() 
{ return this.w; }
rectangle.prototype.H = function() 
{ return this.h; }
rectangle.prototype.properties = 
{ visible:true, loadable:false, updatable:false, drawable:true, collidable:true }
rectangle.prototype.draw = function(g) 
{ g.fillRect(this.x, this.y, this.w, this.h); }
rectangle.prototype.collide = function(r) {
  collision(r, this);
}
