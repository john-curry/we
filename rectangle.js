// ========== RECTANGLE ==========
function rectangle(x, y, w, h) {
  this.x = x; this.y = y; this. w = w, this.h = h; 
  this.updatable = false;
  this.loadable = false;
  this.collidable = true;
  this.priority = 2;
  this.color = "black";
}

rectangle.prototype = Object.create(new point(0, 0));

rectangle.prototype.X = function()
{ return this.x; }

rectangle.prototype.Y = function() 
{ return this.y; }

rectangle.prototype.W = function() {
    return this.w; 
}

rectangle.prototype.H = function() {
    return this.h; 
}

rectangle.prototype.collide = collision;

rectangle.prototype.toPoint = function() {
  return new point(this.x, this.y);
}

rectangle.prototype.dimensions = function() {
  return new point(this.w, this.h);
}

rectangle.prototype.draw = function(g) { 
    g.fillStyle = this.color;
    g.fillRect(this.x, this.y, this.w, this.h); 
}
rectangle.prototype.toString = function() {
  return "Rectangle w,h" + this.dimensions() + " @ " + this.toPoint();
}
